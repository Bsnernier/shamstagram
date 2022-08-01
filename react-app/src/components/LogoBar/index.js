import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo from "./sham.png";
import "./LogoBar.css";

const LogoBar = () => {
    function toggleMenu() {
        const menuToToggle = document.querySelector(".profile_dropdown");
        menuToToggle.classList.toggle("active");
    }

    return (
        <div className="logo-container__container">
            <div className="logo-container">
                <img className="logobar-image" src={logo} alt="logo" />
            </div>
            <ul className="nav_element">
                <li className="link-container">
                    <NavLink to="/" exact={true} activeClassName="active">
                        <i class="fa-solid fa-house fa-xl navbar-image"></i>
                    </NavLink>
                </li>
                <li className="link-container">
                    <NavLink to="/post" exact={true} activeClassName="active">
                        <i class="fa-regular fa-square-plus fa-xl navbar-image"></i>
                    </NavLink>
                </li>
                <li className="link-container__profile">
                    <button onClick={toggleMenu} className="navbar-profile">
                        <i class="fa-regular fa-user fa-xl navbar-image"></i>
                    </button>
                    <div className="profile_dropdown">
                        {" "}
                        <div className="dropdown_button_div">
                            <i class="fa-solid fa-circle-user fa-xl"></i>
                            <button className="profile_dropdown__button">Profile</button>
                        </div>
                        <LogoutButton />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default LogoBar;
