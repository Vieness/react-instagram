import {LOGIN_USER_FAILURE, LOGIN_USER_STARTED, LOGIN_USER_SUCCESS} from "../types";
import LocalStorageService from "../../services/localStorageService";

export const loginUserStarted = () => ({
    type: LOGIN_USER_STARTED
})
export const loginUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error
})
export const loginUserSuccess = (data) => ({
    type: LOGIN_USER_SUCCESS,
    payload: data
})

/*
export const loginUser = (data) => {
    return async (dispatch) => {
        dispatch(loginUserStarted());
        fetch('/api/v1/auth/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(response=> response.json())
            .then(res =>{
                LocalStorageService.setToken(res.data.token)
                dispatch(loginUserSuccess(res))
            })
            .catch(error => dispatch(loginUserFailure(error)))
    }
}*/

export const loginUser = (data) => {
    return async (dispatch) => {
        dispatch(loginUserStarted());
        fetch('/api/v1/auth/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(res => {
                LocalStorageService.setToken(res.data.token)
                dispatch(loginUserSuccess(res))
            })
            .catch(error => dispatch(loginUserFailure(error)));
    }
};
