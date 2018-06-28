import { loginApi } from '../../services/loginApi';

const STORE_PATH ='login';

// Selectors
export function signInResp(state) {
    return state.appReducer[STORE_PATH] ? state.appReducer[STORE_PATH].data : null;;
}

export function selectFetching(state) {
    return state.appReducer[STORE_PATH] ? state.appReducer[STORE_PATH].fetching: null;
}

export function selectError(state) {
    return state.appReducer[STORE_PATH] ? state.appReducer[STORE_PATH].error : null;
}

export const signInAction = (postData, callback) => (dispatch) => {
    dispatch({ type: 'REQUEST', STORE_PATH });
    loginApi(postData, STORE_PATH, dispatch, callback);
};