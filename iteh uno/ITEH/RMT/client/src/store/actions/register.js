import * as actionTypes from '../actions/actionTypes';
var axios = require('axios');

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        message: message
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const register = (name, surname, email, username, password) => {
    return dispatch => {
        dispatch(registerStart());

        const registerData = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
        };

        const URL = 'http://localhost:3000/user/register';
        axios.post(URL, registerData) 
            .then(response => {
                dispatch(registerSuccess(response.data.message));
            })
            .catch(err => {
                dispatch(registerFail(err));
            });
     };
};