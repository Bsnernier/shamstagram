import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp, login } from "../../store/session";
import "./styles/SignUpForm.css";

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [signupButtonId, setSignupButtonId] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (password !== repeatPassword) {
            setErrors(["Passwords don't match"]);
        } else {
            setErrors([]);
        }
    }, [password, repeatPassword]);

    useEffect(() => {
        if (document.getElementById("signup_button")) {
            setSignupButtonId(document.getElementById("signup_button"));
        }
    });

    useEffect(() => {
        if (
            username !== "" &&
            email !== "" &&
            password !== "" &&
            repeatPassword !== "" &&
            errors.length === 0
        ) {
            signupButtonId.disabled = false;
            signupButtonId.style.background = "#0095f6";
        } else if (!signupButtonId) {
            setSignupButtonId(document.getElementById("signup_button"));
        } else {
            signupButtonId.disabled = true;
            signupButtonId.style.background = "#b2dffc";
        }
    });

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            }
        }
    };

    const demoOnLogin = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
        if (password !== repeatPassword) {
            setErrors(["Passwords don't match"]);
        } else {
            setErrors([]);
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={onSignUp}>
                <h1>Shamstagram</h1>
                <div>
                    {errors.map((error, ind) => (
                        <div className="signup-errors" key={ind}>
                            {error}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <label>
                        <span className="input-label">User Name:</span>
                        <input
                            className="signup_input"
                            type="text"
                            name="username"
                            onChange={updateUsername}
                            value={username}
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label>
                        <span className="input-label">Email:</span>
                        <input
                            className="signup_input"
                            type="text"
                            name="email"
                            onChange={updateEmail}
                            value={email}
                        />
                    </label>
                </div>
                <div className="input-container">
                    <label>
                        <span className="input-label">Password:</span>
                        <input
                            className="signup_input"
                            type="password"
                            name="password"
                            onChange={updatePassword}
                            value={password}
                        ></input>
                    </label>
                </div>
                <div className="input-container">
                    <label>
                        <span className="input-label">Repeat Password:</span>
                        <input
                            className="signup_input"
                            type="password"
                            name="repeat_password"
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required={true}
                        ></input>
                    </label>
                </div>
                <button id="signup_button" className="signup_button" type="submit">
                    Sign Up
                </button>
                <button className="login_button" onClick={() => history.push("/login")}>
                    Already a user? Log in
                </button>
                <button className="demo_button" type="submit" onClick={demoOnLogin}>
                    Demo
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
