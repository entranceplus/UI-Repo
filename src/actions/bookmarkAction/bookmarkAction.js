import { bookmarkapi, bookmarkListapi } from '../../services/bookmarklistapi';
import * as actionTypes from '../../constants/actiontypes.js'


export const saveBookMarkAction = (url, tags, saveCallback) => () => {
    bookmarkapi(url, tags, (response) => {
        console.log(response);
        saveCallback(response);
    });
};

export const getBookMarkAction = () => (dispatch) => {
    bookmarkListapi( (response) => {
        console.log(response);
    });
};