const FOLLOW_USER = "session/FOLLOW_USER";
const CHECK_USER = "session/CHECK_USER";
const UNFOLLOW_USER = "session/UNFOLLOW_USER";

const followUser = (user) => ({
    type: FOLLOW_USER,
    payload: user,
});

const checkUser = (user) => ({
    type: CHECK_USER,
    payload: user,
});

const unfollowUser = (user) => ({
    type: UNFOLLOW_USER,
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

export const checkAUser = (userId) => async (dispatch) => {
    const res = await fetch(`api/users/${userId}/follow`);

    if (res.ok) {
        const resultDispatch = dispatch(checkUser(res));
        const result = await resultDispatch.payload.json();

        if (result["Success"]) {
            return true;
        } else if (result["Unsuccessful"]) {
            return false;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

export const unfollowAUser = (userId) => async (dispatch) => {
    const res = await fetch(`api/users/${userId}/unfollow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        dispatch(unfollowUser(res));
        return true;
    } else {
        return false;
    }
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return { user: action.payload };
        case CHECK_USER:
            return { user: action.payload };
        case UNFOLLOW_USER:
            return { user: action.payload };
        default:
            return state;
    }
}
