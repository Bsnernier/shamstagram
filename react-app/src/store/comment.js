const ADD_COMMENT = "comments/ADD_COMMENT";
const GET_COMMENTS = "comments/GET_COMMENTS";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

const getComments = (comment) => ({
    type: GET_COMMENTS,
    comment,
});

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    payload: comment,
});

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment,
});

export const createComment = (user, text, post) => async (dispatch) => {
    let formData = new FormData();

    formData.append("postId", post.id);
    formData.append("userId", user.id);
    formData.append("text", text);

    const commentRes = await fetch("/api/comments/", {
        method: "POST",
        body: formData,
    });

    if (commentRes.ok) {
        const data = await commentRes.json();
        dispatch(addComment(data));
        return { data: data };
    } else if (commentRes.status < 500) {
        const data = await commentRes.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getAllComments = (postId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${postId}`);

    let comments;
    if (res.ok) {
        comments = await res.json();
        dispatch(getComments(comments));
    }

    return comments;
};

export const deleteOneComment = (commentId) => async (dispatch) => {
    const res = await fetch(`api/comments/${commentId}/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            commentId,
        }),
    });

    if (res.ok) {
        let comment = await res.json();
        dispatch(deleteComment(comment));
    }
};

export const editOneComment = (commentId, text) => async (dispatch) => {
    let formData = new FormData();
    formData.append("commentId", commentId);
    formData.append("text", text);

    const res = await fetch(`/api/comments/${commentId}/edit`, {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        await res.json();
        dispatch(editComment(text));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

const initialState = {
    comment: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return { comment: action.payload };
        case GET_COMMENTS:
            return action.comment;
        case DELETE_COMMENT:
            if (action.payload["Success"]) {
                delete action.payload["Success"];
                return state;
            }
            break;
        case EDIT_COMMENT:
            let comment = action.payload;
            return (state.comment = { comment });
        default:
            return state;
    }
}
