import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { erasePost } from "../../store/post";
import "./PostDelete.css";

const PostDeleteButton = ({ post }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(erasePost(post));
        history.push("/posts/1");
        history.push("/");
    };

    return (
        <form onSubmit={handleDelete}>
            <button className="post-button post-modal-button delete-post-button" type="submit">
                Delete
            </button>
        </form>
    );
};

export default PostDeleteButton;
