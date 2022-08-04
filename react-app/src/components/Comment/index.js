import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comment";
import "./Comment.css";

function Comment({ user, post }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const updateText = (e) => {
        const currText = e.target.value;
        setText(currText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createComment(user, text, post));
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input
                className="comment-form-input"
                placeholder="Add a comment..."
                type="text"
                value={text}
                onChange={updateText}
                maxLength="140"
            />
            <div className="comment-form-noninput">
                <div className="charcounter_text">Characters Remaining : {140 - text.length}</div>
                <button className="post-button comment-submit-button" type="submit">
                    Post
                </button>
            </div>
        </form>
    );
}

export default Comment;
