var axios = require('axios');

var client = axios.create({
  baseURL: "https://links.entranceplus.in",
  timeout: 1000,
  headers: {'Authorization': 'bearer ' + localStorage.getItem('access_token')}
});

export function bookmarkapi(url, tags, actionCallback) {
  let postData = { 'url': url, 'tags': tags };

  client.post('/links', postData)
    .then(response => response.data)
    .then(json => actionCallback(json))
    .catch(error => console.log(error));
}

export function bookmarkListapi() {
  client.get("/links")
    .then(response => response.data)
}
