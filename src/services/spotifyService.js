import axios from 'axios';

const BASE = 'https://api.spotify.com/v1/me';
const headers = token => ({
  headers: {
    Authorization: `Bearer ${ token }`
  }
});

async function requestWrapper(config, successCallback = () => {}, errorCallback = () => {}) {
  return await axios(config)
    .then(successCallback)
    .catch(({ response }) => errorCallback(response.data.error));
}

export async function fetchPlaylists({ token }, successCallback, errorCallback) {
  requestWrapper({
    method: 'get',
    url: `${ BASE }/playlists`,
    ...headers(token)
  },
  response => successCallback(response.data.items),
  errorCallback);
}

export async function play({ token, context }, successCallback, errorCallback) {
  requestWrapper({
    method: 'put',
    url: `${ BASE }/player/play`,
    ...headers(token),
    ...(context ? {
      data: {
        context_uri: context // eslint-disable-line
      }
    } : {})
  },
  successCallback,
  errorCallback);
}

export async function pause({ token }, successCallback, errorCallback) {
  requestWrapper({
    method: 'put',
    url: `${ BASE }/player/pause`,
    ...headers(token)
  },
  successCallback,
  errorCallback);
}

export async function next({ token }, successCallback, errorCallback) {
  requestWrapper({
    method: 'post',
    url: `${ BASE }/player/next`,
    ...headers(token)
  },
  successCallback,
  errorCallback);
}

export async function previous({ token }, successCallback, errorCallback) {
  requestWrapper({
    method: 'post',
    url: `${ BASE }/player/previous`,
    ...headers(token)
  },
  successCallback,
  errorCallback);
}

export async function fetchCurrentTrack({ token }, successCallback, errorCallback) {
  requestWrapper({
    method: 'get',
    url: `${ BASE }/player`,
    ...headers(token)
  },
  res => successCallback(res.data.item),
  errorCallback);
}
