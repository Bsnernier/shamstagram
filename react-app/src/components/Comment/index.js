import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getAllComments } from "../../store/comment";
import "./Comment.css";

function Comment({ user, post }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    let commentList = [];

    useEffect(async () => {
        let dispatchedComments = await dispatch(getAllComments(post.id));

        Object.keys(dispatchedComments).forEach((key) => {
            commentList.push(dispatchedComments[key]);
        });
        setComments(commentList);
    }, [dispatch, text]);

    const updateText = (e) => {
        const currText = e.target.value;
        setText(currText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createComment(user, text, post));
        setText("");
    };

    return (
        <div>
            <div className="post-comment-container">
                {comments.map((comment) => (
                    <div className="post-comment-info">
                        <div className="comment-username">{comment.username}</div>
                        <div className="comment-text">{comment.text}</div>
                    </div>
                ))}
            </div>
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
        </div>
    );
}

export default Comment;
