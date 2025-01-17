import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import PostForm from "./components/PostForm";
import LogoBar from "./components/LogoBar";
import Image from "./components/Image";
import Post from "./components/Post";
import PostFeed from "./components/PostFeed";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <div>
                    <LogoBar />
                    <ProtectedRoute path="/post" exact={true}>
                        <PostForm />
                    </ProtectedRoute>
                    <ProtectedRoute path="/posts/:postId" exact={true}>
                        <Post />
                    </ProtectedRoute>
                    <ProtectedRoute path="/images" exact={true}>
                        <Image />
                    </ProtectedRoute>
                    <ProtectedRoute path="/users" exact={true}>
                        <UsersList />
                    </ProtectedRoute>
                    <ProtectedRoute path="/users/:userId" exact={true}>
                        <User />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile" exact={true}>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path="/" exact={true}>
                        <PostFeed />
                    </ProtectedRoute>
                </div>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
