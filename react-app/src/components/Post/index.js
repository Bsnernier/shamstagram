import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOnePost } from "../../store/post";
import { createLike, getOneLike, deleteOneLike } from "../../store/like";
import { followAUser, checkAUser, unfollowAUser } from "../../store/follow";
import PostDelete from "../PostDelete";
import PostEditForm from "../PostEditForm";
import Comment from "../Comment";
import "./Post.css";

function Post(propPostId) {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [altText, setAltText] = useState("");
    const [username, setUsername] = useState("");
    const [editDisplay, setEditDisplay] = useState(false);
    const [editButtonDisplay, setEditButtonDisplay] = useState(false);
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likedId, setLikedId] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [checkedFollow, setCheckedFollow] = useState(false);

    let { postId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    if (!postId) {
        postId = propPostId.postId;
    }

    const post = useSelector((state) => state.post);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!post[postId]) {
            history.push("/");
        }
    }, [history, post, postId]);

    useEffect(() => {
        async function fetchData() {
            dispatch(getOnePost(postId));
            let res = await dispatch(getOneLike(user, postId));
            if (res) {
                setLikedId(res);
                setLiked(true);
            }
        }
        fetchData();
    }, [dispatch, postId, liked]);

    useEffect(() => {
        setDescription(post[postId]?.description);
        setImageUrl(post[postId]?.image_url);
        setUsername(post[postId]?.username);
        setAltText(post[postId]?.alt_text);
        if (user.id === post[postId]?.userId) {
            setDeleteDisplay(true);
            setEditButtonDisplay(true);
        }
    }, [user.id, post, postId, liked]);

    useEffect(() => {
        checkFollow(post[postId]?.userId);
    }, [checkedFollow]);

    function likePost(e) {
        if (liked) {
            setLiked(false);
            dispatch(deleteOneLike(e.target.id));
        } else {
            setLiked(true);
            dispatch(createLike(user, postId));
        }
    }

    function follow(e) {
        dispatch(followAUser(e.target.id));
    }

    function unfollow(e) {
        dispatch(unfollowAUser(e.target.id));
    }

    async function checkFollow(id) {
        const result = await dispatch(checkAUser(id));

        if (result) {
            setCheckedFollow(true);
        } else {
            setCheckedFollow(false);
        }
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openEditModal() {
        setEditIsOpen(true);
    }

    function closeEditModal() {
        setEditIsOpen(false);
    }

    function handleMultipleModals() {
        if (modalIsOpen) {
            setIsOpen(false);
            setEditIsOpen(true);
        }
    }

    let likeHeart = <i className="fa-regular fa-heart fa-xl" onClick={likePost}></i>;

    if (liked) {
        likeHeart = <i id={likedId} className="fa-solid fa-heart fa-xl" onClick={likePost}></i>;
    }

    let editContent = null;

    if (editDisplay) {
        editContent = <PostEditForm post={post[postId]} hideForm={() => setEditDisplay(false)} />;
    }

    let editButton = null;

    if (editButtonDisplay) {
        editButton = (
            <button
                className="post-button post-modal-button edit-description-button"
                onClick={handleMultipleModals}
            >
                Edit{" "}
            </button>
        );
    } else {
        if (checkedFollow) {
            editButton = (
                <button
                    id={post[postId]?.userId}
                    className="post-button post-modal-button edit-description-button"
                    onClick={unfollow}
                >
                    Following{" "}
                </button>
            );
        } else {
            editButton = (
                <button
                    id={post[postId]?.userId}
                    className="post-button post-modal-button edit-description-button"
                    onClick={follow}
                >
                    Follow{" "}
                </button>
            );
        }
    }

    let deleteContent = null;

    if (deleteDisplay) {
        deleteContent = (
            <PostDelete className="post-button post-modal-button delete-post-button" post={post[postId]} />
        );
    }

    return (
        <>
            <div className="post-container__container">
                <div className="post-container">
                    <div className="post-username-container">
                        <div className="post-username-name">{username}</div>
                        <i
                            className="fa-solid fa-ellipsis fa-xl post-username-modal"
                            onClick={openModal}
                        ></i>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            ariaHideApp={false}
                            className="post-modal"
                            overlayClassName="post-modal__overlay"
                        >
                            {editButton}
                            {deleteContent}
                            <button
                                className="post-button post-modal-button post-modal-cancel"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </Modal>
                    </div>
                    <div className="post-image__container">
                        <img className="post-image" src={imageUrl} alt={altText}></img>
                    </div>
                    <Modal
                        isOpen={editIsOpen}
                        onRequestClose={closeEditModal}
                        ariaHideApp={false}
                        className="edit-modal"
                        overlayClassName="edit-modal__overlay"
                    >
                        <PostEditForm post={post[postId]} hideForm={() => setEditIsOpen(false)} />
                    </Modal>

                    <div className="post-description-container">
                        <div className="post-description-buttons">{likeHeart}</div>
                        <div className="post-description-text">{description}</div>
                    </div>

                    {editContent}
                    <Comment user={user} post={post[postId]} />
                </div>
            </div>
        </>
    );
}

export default Post;
