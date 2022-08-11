import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteOneComment } from "../../store/comment";
import CommentEdit from "../CommentEdit";
import "./CommentSolo.css";

function CommentSolo(props) {
    const dispatch = useDispatch();
    const [currUserId, setCurrUserId] = useState(props.user.id);
    const [comUserId, setComUserId] = useState(props.comment.userId);
    const [comId, setComId] = useState(props.comment.id);
    const [comUsername, setComUsername] = useState(props.comment.username);
    const [comText, setComText] = useState(props.comment.text);
    const [commentDropdownDisplay, setCommentDropdownDisplay] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    let commentDropdownButton = null;

    useEffect(() => {
        if (currUserId === comUserId) {
            setCommentDropdownDisplay(true);
        } else {
            setCommentDropdownDisplay(false);
        }
    }, [comUsername, props.comment]);

    useEffect(() => {
        const checkIfClickedOutide = (e) => {
            const targetId = e.target.id;

            if (targetId) {
                return;
            } else {
                setIsDropdownOpen(false);
                const buttonDropdownClasses = document.querySelectorAll(".comment_dropdown");
                buttonDropdownClasses.forEach((clas) => {
                    clas.classList.remove("active");
                });
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutide);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutide);
        };
    }, [isDropdownOpen]);

    function toggleDropdown(id) {
        const dropdownToToggle = document.querySelector(`#comment_dropdown${id}`);
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
            dropdownToToggle.classList.toggle("active");
        } else {
            setIsDropdownOpen(true);
            dropdownToToggle.classList.toggle("active");
        }
        return id;
    }

    function deleteHandler(e) {
        e.preventDefault();
        const deleteFullId = e.target.id;
        const deleteNumberId = deleteFullId.slice(12);
        dispatch(deleteOneComment(deleteNumberId));
    }

    if (commentDropdownDisplay) {
        commentDropdownButton = (
            // <button
            //     id="comment_dropdown_button"
            //     className="comment_dropdown_button"
            //     onClick={() => toggleDropdown(comId)}
            // >
            //     button
            // </button>
            <i
                id="comment_dropdown_button"
                class="fa-solid fa-circle-chevron-down comment_dropdown_button"
                onClick={() => toggleDropdown(comId)}
            ></i>
        );
    }

    function openEditModal(id) {
        setEditIsOpen(true);
        toggleDropdown(id);
    }

    function closeEditModal() {
        setEditIsOpen(false);
    }

    return (
        <div className="post-comment-info" key={comId}>
            <div className="comment-username">{comUsername}</div>
            <div className="comment-text">{comText}</div>
            <div id="triangle"></div>
            <div id={`comment_dropdown${comId}`} className="comment_dropdown">
                <button
                    id="editButton"
                    className="comment_dropdown_edit"
                    onClick={() => openEditModal(comId)}
                >
                    Edit
                </button>
                <button
                    id={`deleteButton${comId}`}
                    className="comment_dropdown_delete"
                    onClick={deleteHandler}
                >
                    Delete
                </button>
            </div>
            {commentDropdownButton}
            <Modal
                isOpen={editIsOpen}
                onRequestClose={closeEditModal}
                ariaHideApp={false}
                className="edit-modal"
                overlayClassName="edit-modal__overlay"
            >
                <CommentEdit
                    commentId={comId}
                    commentText={comText}
                    hideForm={() => setEditIsOpen(false)}
                />
            </Modal>
        </div>
    );
}

export default CommentSolo;