export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

import * as APIUtil from "../utils/session_api_util";

export const login = user => dispatch => (
  APIUtil.login(user).then(user => dispatch(receiveUser(user)), ({responseJSON}) => dispatch(receiveErrors(responseJSON)))
)

export const logout = () => dispatch => (
  APIUtil.logout().then(() => dispatch(logoutUser()), ({responseJSON}) => dispatch(receiveErrors(responseJSON)))
)

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => dispatch(receiveUser(user)), ({responseJSON}) => dispatch(receiveErrors(responseJSON)))
)

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})