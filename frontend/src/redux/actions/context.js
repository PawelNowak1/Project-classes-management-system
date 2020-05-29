import axios from 'axios';
import {eraseCookie, getCookie, setCookie} from "../../theme/cookies";
import {API_URL} from "../../theme/constans";

export const CHANGE_CONTEXT = "CHANGE_CONTEXT";
export const FETCH_CONTEXTS = "FETCH_CONTEXTS";


const changeContext = (contextId) => {
    return {
        type: CHANGE_CONTEXT,
        id: contextId
    };
};

const fetchContexts = (contexts) => {
    return {
        type: FETCH_CONTEXTS,
        contexts: contexts
    };
};

export const changeContextFunc = (contextID) => dispatch => {
        dispatch(changeContext(contextID));
};

export const getAllContexts = () => dispatch => {
    axios.get(`${API_URL}/semesters/all`, {
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
        },
    })
    .then((res) => {
        dispatch(fetchContexts(res.data));
    })
};