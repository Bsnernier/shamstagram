import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./styles/LoginForm.css";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailStyleValue, setEmailStyleValue] = useState("");
    const [passwordStyleValue, setPasswordStyleValue] = useState("");
    const [loginButtonId, setLoginButtonId] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (document.getElementById("email")) {
            setEmailStyleValue(document.getElementById("email").value);
            setPasswordStyleValue(document.getElementById("password").value);
            setLoginButtonId(document.getElementById("login-button"));
        }
    });

    useEffect(() => {
        if (emailStyleValue) {
            if (emailStyleValue !== "" && passwordStyleValue !== "") {
                loginButtonId.disabled = false;
                loginButtonId.style.background = "#0095f6";
            } else {
                loginButtonId.disabled = true;
                loginButtonId.style.background = "#b2dffc";
            }
        }
    }, [emailStyleValue, passwordStyleValue, loginButtonId]);

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const demoOnLogin = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={onLogin}>
                <h1>Shamstagram</h1>
                <div>
                    {errors.map((error, ind) => (
                        <div className="login-errors" key={ind}>
                            {error}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <label htmlFor="email">
                        <span className="input-label">Email:</span>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            // placeholder="Email"
                            value={email}
                            onChange={updateEmail}
                            className="login_input"
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label htmlFor="password">
                        <span className="input-label">Password:</span>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            // placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                            className="login_input"
                        />
                    </label>
                </div>
                <button id="login-button" className="login-button" type="submit">
                    Login
                </button>
                <button className="signup_link_button" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </button>
                <button className="demo_button" onClick={demoOnLogin}>
                    Demo
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
