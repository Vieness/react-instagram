import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_STARTED, LOGIN_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_STARTED,
    REGISTER_USER_SUCCESS
} from "../types";

const initialState = {
    loading: false,
    authorized: false,
    user: null,
    error: null,
    success: false
}

export function auth(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER_STARTED,
             LOGIN_USER_STARTED:
            return {...state, loading: true, user: null}
        case REGISTER_USER_FAILURE,
             LOGIN_USER_FAILURE:
            return {...state, loading: false, error: action.payload.error}
        case REGISTER_USER_SUCCESS,
             LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                authorized: true,
                user: action.payload.data.user,
                success: action.payload.success
            }
        default:
            return state;
    }
};