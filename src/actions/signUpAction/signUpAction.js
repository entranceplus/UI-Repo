import { signUpApi } from '../../services/signUpApi';

const STORE_PATH ='signUp';

// Selectors
export function signUpResp(state) {
    return state.appReducer[STORE_PATH] ? state.appReducer[STORE_PATH].data : null;;
}

export function selectFetching(state) {
    return state.appReducer[STORE_PATH] ? state.appReducer[STORE_PATH].fetching: null;
}

export function selectError(state) {
    return state.appReducer[STORE_PATH] ? state.appReducer[STORE_PATH].error : null;
}

export const signUpAction = (postData, callback) => (dispatch) => {
    dispatch({ type: 'REQUEST', STORE_PATH });
    signUpApi(postData, STORE_PATH, dispatch, callback);
};