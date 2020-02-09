import * as actionTypes from './actionTypes';
import jwt_decode from 'jwt-decode';
var axios = require('axios');

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, message, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username: username,
        idToken: token,
        message: message
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout);
        }, expirationTime * 1000);
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            username: username,
            password: password
        };

        const URL = 'http://localhost:3000/user/login';
        axios.post(URL, authData)
            .then(response => {

                dispatch(authSuccess(response.data.idToken, response.data.message, response.data.username));
                const jwt_decoded = jwt_decode(response.data.idToken);

                dispatch(checkAuthTimeout(jwt_decoded.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};
