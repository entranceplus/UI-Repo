import {API_ROOT} from '../config/apiConfig.js';
var axios = require('axios');

export const client = axios.create({
    baseURL: API_ROOT,
    headers: {
      'Content-Type': 'application/json',
      'app_key': 'rhx6h7neqc'
    }
});

export function httpClient(type, url, postData) {
    switch(type) {
        case 'get': 
            return client.get(url)
        case 'post':
            return client.post(url, postData)
        case 'delete':
            return client.delete(url)
        case 'put':
            return client.put(url, postData)
    }
}

export const http = (type, url, postData, STORE_PATH, dispatch, callback) => {
    httpClient(type, url, postData)
    .then(resp => {
        let data = resp.data
        dispatch({ type: 'SUCCESS', STORE_PATH, data });
        callback && callback(data);
    })
    .catch(error => {
        console.log(error);
        var err = error.errMsg ? error.errMsg : error.message
        dispatch({ type: 'ERROR', STORE_PATH, err});
    });
}