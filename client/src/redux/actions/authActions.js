import {REGISTER_USER_FAILURE, REGISTER_USER_STARTED, REGISTER_USER_SUCCESS} from "../types";
import LocalStorageService from "../../services/localStorageService";
import axios from "axios";

export const registerUserStarted = () => ({
  type: REGISTER_USER_STARTED
});

export const registerUserSuccess = data => ({
  type: REGISTER_USER_SUCCESS,
  payload: data
});

export const registerUserFailure = error => ({
  type: REGISTER_USER_FAILURE,
  payload: error
});

/*export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch(registerUserStarted());
    fetch('/api/v1/auth/register', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(res => {
        LocalStorageService.setToken(res.data.token)
        dispatch(registerUserSuccess(res))
      })
      .catch(error => dispatch(registerUserFailure(error)));
  }
};*/


export const registerUser = (data) => {
  return async(dispatch)=>{
    dispatch(registerUserStarted());
    axios.post('/api/v1/auth/register',data)
        .then(res => {
          LocalStorageService.setToken(res.data.token)
          dispatch(registerUserSuccess(res))
        })
        .catch(function(error)
        {registerUserFailure(error)})
  }
};

