export function bookmarkapi(url, tags, actionCallback) {
  let postUrl = 'https://links.entranceplus.in/links';
  let postData = { 'url': url, 'tags': tags };

  fetch(postUrl, {
    credentials: 'same-origin',
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+localStorage.getItem('access_token')
    }),
    body: JSON.stringify(postData)
  }).then(response => response.json())
    .then(json => actionCallback(json));
}

export function bookmarkListapi() {
  let postUrl = 'https://links.entranceplus.in/links';

  fetch(postUrl, {
    credentials: 'same-origin',
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+localStorage.getItem('access_token')
    })
  }).then(response => response.json())
}