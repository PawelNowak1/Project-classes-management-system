
import {
    CHANGE_CONTEXT, FETCH_CONTEXTS
} from "../actions/";

export default (
    state = {
        current:{},
        all:[]
    },
    action
) => {
    switch (action.type) {
        case CHANGE_CONTEXT:
            return {
                ...state,
                current: state.all.filter(item => item.id === action.id)[0]
            };
        case FETCH_CONTEXTS:
            return {
                all:action.contexts,
                current: action.contexts[0]
            };
        default:
            return state;
    }
};