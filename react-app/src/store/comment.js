const ADD_COMMENT = "comments/ADD_COMMENT";
const GET_COMMENTS = "comments/GET_COMMENTS";

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments,
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

export const getAllPosts = () => async (dispatch) => {
    const res = await fetch("/api/comments");

    if (res.ok) {
        const comments = await res.json();
        dispatch(getComments(comments));
    }
};

const initialState = {
    comment: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return { comments: action.payload };
        case GET_COMMENTS:
            return action.comments;
        default:
            return state;
    }
}
