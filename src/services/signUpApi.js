import {http} from '../helper/commonFunc.js';

export function signUpApi(postData, storePath, dispatch, callback) {
    http('post', '/user/signup', postData, storePath, dispatch, callback);
}