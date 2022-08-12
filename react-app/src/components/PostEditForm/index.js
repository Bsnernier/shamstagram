import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../store/post";
import "./PostEditForm.css";

const PostEditForm = ({ post, hideForm }) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(post?.description);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        post.description = description;
        await dispatch(editPost(post));
        hideForm();
    };

    const updateDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    return (
        <div className="edit-post-container">
            <div className="edit-post-title">Edit description</div>
            <form onSubmit={handleSubmit} className="edit-post-form-container">
                <input
                    className="edit-form-input"
                    placeholder="Description"
                    type="text"
                    value={description}
                    onChange={updateDescription}
                    maxLength="140"
                />
                <div className="edit-form-noninput">
                    <div className="charcounter_description">
                        Characters Remaining : {140 - description.length}
                    </div>
                    <button className="post-button edit-submit-button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEditForm;
