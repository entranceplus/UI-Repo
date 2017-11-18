import { bookmarkapi, bookmarkListapi } from '../../services/bookmarklistapi';
import * as actionTypes from '../../constants/actiontypes.js'

function getBookMarkList(list) {
    return {
        type: actionTypes.GET_BOOKMARK,
        list
    }
}

export const saveBookMarkAction = (url, tags, saveCallback) => () => {
    bookmarkapi(url, tags, (response) => {
        saveCallback(response);
    });
};

export const getBookMarkAction = (callback) => (dispatch) => {
    bookmarkListapi( (response) => {
        dispatch(getBookMarkList(response));
        callback && callback();
    });
};