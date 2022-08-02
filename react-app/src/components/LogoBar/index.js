import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import logo from "./sham.png";
import "./LogoBar.css";

const LogoBar = (ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        const menuToToggle = document.querySelector(".profile_dropdown");
        if (isMenuOpen) {
            setIsMenuOpen(false);
            menuToToggle.classList.toggle("active");
        } else {
            setIsMenuOpen(true);
            menuToToggle.classList.toggle("active");
        }
    }

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                e.target.id === "profile_dropdown" ||
                e.target.id === "drop1" ||
                e.target.id === "drop2" ||
                e.target.id === "drop3" ||
                e.target.id === "drop4"
            ) {
                return;
            } else {
                setIsMenuOpen(false);
                document.querySelector(".profile_dropdown").classList.remove("active");
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="logo-container__container">
            <div className="logo-container">
                <NavLink to="/" exact={true} activeClassName="active">
                    <img className="logobar-image" src={logo} alt="logo" />
                </NavLink>
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
                        <i id="drop1" class="fa-regular fa-user fa-xl navbar-image"></i>
                    </button>
                    <div id="profile_dropdown" className="profile_dropdown">
                        {" "}
                        <div id="drop2" className="dropdown_button_div">
                            <i id="drop3" class="fa-solid fa-circle-user fa-xl"></i>
                            <button id="drop4" className="profile_dropdown__button">
                                Profile
                            </button>
                        </div>
                        <LogoutButton />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default LogoBar;
