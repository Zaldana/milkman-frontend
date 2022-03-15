export const SIGN_IN_ACTION = "milkman.com/signIn";
export const SIGN_OUT_ACTION = "milkman.com/signOut";

export const userReducer = (state = null, action) => {

    if (action.type === SIGN_IN_ACTION) {
        return action.payload.userData;
    }

    if (action.type === SIGN_OUT_ACTION) {
        return null;
    }

    return state;
};

export const signInActionCreator = (userData) => async (dispatch, getState) => {

        dispatch({
            type: SIGN_IN_ACTION,
            payload: {
                userData: userData,
            }
        });

};