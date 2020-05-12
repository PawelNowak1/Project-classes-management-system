import axios from 'axios';
import {eraseCookie, getCookie, setCookie} from "../../theme/cookies";
import {API_URL} from "../../theme/constans";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_USER = "VERIFY_USER";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_ERROR = "VERIFY_ERROR";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyUser = () => {
    return {
        type: VERIFY_USER
    };
};

const verifySuccess = user => {
    return {
        type: VERIFY_SUCCESS,
        user
    };
};

const verifyError = user => {
    return {
        type: VERIFY_ERROR,
    };
};

export const loginUser = (username, password) => dispatch => {
    dispatch(requestLogin());
    axios.post(`${API_URL}/login`,{
        "username": username,
        "password": password
    }).then(res => {
        const user = res.data;
        setCookie('token',res.data.token,1);
        dispatch(receiveLogin(user));
    }).catch(error => {
        dispatch(loginError());
    });
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    eraseCookie('token');
    dispatch(receiveLogout());

    // dispatch(logoutError());
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyUser());
    const token = getCookie('token');

    axios.get(`${API_URL}/token/verify/${token}`)
        .then(res => {
            if(res.data.valid === 'no'){
                dispatch(verifyError());
                return;
            }
            dispatch(verifySuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(verifyError());
        })
};