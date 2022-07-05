import "./navbar.scss";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import avatarLogo from "../../assets/img/avatar.svg";
import { API_URL } from "../../config";
import { logout } from "../../redux/actions/user-actions";
import { showLoader } from "../../redux/reducers/appReducer";
import { getFiles, searchFiles } from "../../redux/thunks/file";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  function searchChangeHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__header">MY CLOUD APP</div>
        {isAuth && (
          <div className="navbar__search">
            <input
              value={searchName}
              onChange={(e) => searchChangeHandler(e)}
              className="navbar__search-input"
              type="text"
              placeholder="type file name..."
            />
            <SearchIcon />
          </div>
        )}
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Sign In</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Sign Up</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Log Out
          </div>
        )}
        {isAuth && (
          <NavLink to="/profile">
            <img className="navbar__avatar" src={avatar} alt="" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
