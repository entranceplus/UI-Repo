import {http} from '../helper/commonFunc.js';

export function loginApi(postData, storePath, dispatch, callback) {
    http('post', '/user/signin', postData, storePath, dispatch, callback);
}