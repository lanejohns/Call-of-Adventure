import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { logout } from "../../services/auth";
import { logoutThunk } from "../../store/auth"

const LogoutButton = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const theUser = useSelector(state => state.currentUser.id)

  const onLogout = async (e) => {
    // await logout();
    // setAuthenticated(false);
    await dispatch(logoutThunk())
    // return <Redirect to="/" />
    window.location.reload(false)
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
