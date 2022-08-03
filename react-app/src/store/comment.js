const ADD_COMMENT = "comments/ADD_COMMENT";

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

export const createComment = (user, text, post) => async (dispatch) => {
    let formData = new FormData();
    let new_comment = {
        postId: post.id,
        userId: user.id,
        text,
    };

    formData.append("new_comment", new_comment);

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

const initialState = {
    comment: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return { comments: action.payload };
        default:
            return state;
    }
}
