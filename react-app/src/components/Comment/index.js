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
    const [arrComments, setArrComments] = useState([...commentList]);

    const [testState, setTestState] = useState("");

    useEffect(() => {
        async function fetchData() {
            let dispatchedComments = await dispatch(getAllComments());

            // Object.keys(dispatchedComments).forEach((key) => {
            //     commentList.unshift(dispatchedComments[key]);
            // });
            // setComments(commentList);

            setTestState(dispatchedComments);
        }
        fetchData();
        test.comment = commentList;
    }, [dispatch]);

    const test = useSelector((state) => state);

    useEffect(() => {
        console.log("test", test.comment);
        setComments(test.comment);

        Object.keys(comments).forEach((key) => {
            if (comments[key].postId === post.id) {
                commentList.unshift(comments[key]);
            }
        });

        setArrComments(commentList);
    }, [test]);

    const updateText = (e) => {
        const currText = e.target.value;
        setText(currText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createComment(user, text, post));
        setText("");
        await dispatch(getAllComments());
    };

    return (
        <div>
            <div className="post-comment-container">
                {arrComments.map((comment) => (
                    <CommentSolo user={user} post={post} comment={comment} key={comment.id} />
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
