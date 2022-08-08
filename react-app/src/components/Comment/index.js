import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, getAllComments } from "../../store/comment";
import "./Comment.css";

function Comment({ user, post }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    let commentList = [];

    useEffect(() => {
        async function fetchData() {
            let dispatchedComments = await dispatch(getAllComments(post.id));
            console.log(dispatchedComments);

            Object.keys(dispatchedComments).forEach((key) => {
                console.log(key);
                commentList.unshift(dispatchedComments[key]);
            });
            setComments(commentList);
        }
        fetchData();
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
                    <div className="post-comment-info" key={comment.id}>
                        <div className="comment-username">{comment.username}</div>
                        <div className="comment-text">{comment.text}</div>
                        <div>{comment.id}</div>
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
