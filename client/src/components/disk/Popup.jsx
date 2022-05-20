import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createDir } from '../../redux/thunks/file';
import Input from '../../utils/input/Input';

const Popup = ({isPopupVisible, hidePopupHandler}) => {
    const [dirName, setDirName] = useState('')
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
    }

    return (
        isPopupVisible && <div className="popup" onClick={() => hidePopupHandler(false)}>
        <div className="popup__content" onClick={(event => event.stopPropagation())}>
            <div className="popup__header">
                <div className="popup__title">Create new folder</div>
                <button className="popup__close" onClick={() => hidePopupHandler(false)}>X</button>
            </div>
            <Input type="text" placeholder="type folder name..." value={dirName} setValue={setDirName}/>
            <button className="popup__create" onClick={() => createHandler()}>Create</button>
        </div>
    </div>
    );
};

export default Popup;
