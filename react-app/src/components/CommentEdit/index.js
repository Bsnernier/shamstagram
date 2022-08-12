import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOneComment } from "../../store/comment";
import "./CommentEdit.css";

const CommentEdit = (comment) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    useEffect(() => {
        setText(comment?.commentText);
    }, [comment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editOneComment(comment.commentId, text));
        comment.hideForm();
    };

    const updateText = (e) => {
        const text = e.target.value;
        setText(text);
    };

    return (
        <div className="edit-post-container">
            <div className="edit-post-title">Edit description</div>
            <form onSubmit={handleSubmit} className="edit-post-form-container">
                <input
                    className="edit-form-input"
                    placeholder="Comment"
                    type="text"
                    value={text}
                    onChange={updateText}
                    maxLength="140"
                />
                <div className="edit-form-noninput">
                    <div className="charcounter_description">
                        Characters Remaining : {140 - text.length}
                    </div>
                    <button className="post-button edit-submit-button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentEdit;
