const FOLLOW_USER = "session/FOLLOW_USER";

const followUser = (user) => ({
    type: FOLLOW_USER,
    payload: user,
});

export const followAUser = (userId) => async (dispatch) => {
    const res = await fetch(`api/users/${userId}/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        let userCheck = await res.json();
        if (userCheck.error) {
            return [userCheck.error];
        } else {
            dispatch(followUser(userCheck));
            return null;
        }
    }
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return { user: action.payload };
        default:
            return state;
    }
}
