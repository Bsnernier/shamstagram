import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <button id="drop4" className="profile_dropdown__logout" onClick={onLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
