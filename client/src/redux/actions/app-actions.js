import { SHOW_LOADER, HIDE_LOADER } from "../reducers/appReducer";

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });
