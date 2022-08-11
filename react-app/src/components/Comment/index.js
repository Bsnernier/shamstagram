import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getAllComments } from "../../store/comment";
import CommentSolo from "../CommentSolo";
import "./Comment.css";

function Comment({ user, post }) {
    let commentList = [];
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [comments, setComments] = useState([...commentList]);
    const [refresh, setRefresh] = useState(false);

    const test = useSelector((state) => state);

    useEffect(() => {
        async function fetchData() {
            let dispatchedComments = await dispatch(getAllComments(post?.id));

            Object.keys(dispatchedComments).forEach((key) => {
                commentList.unshift(dispatchedComments[key]);
            });
            setComments(commentList);
        }
        fetchData();
        test.comments = commentList;
    }, [dispatch, CommentSolo]);

    const updateText = (e) => {
        const currText = e.target.value;
        setText(currText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createComment(user, text, post));
        setText("");
        setRefresh(true);
    };

    return (
        <div>
            <div className="post-comment-container">
                {comments.map((comment) => (
                    <CommentSolo user={user} post={post} comment={comment} />
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
