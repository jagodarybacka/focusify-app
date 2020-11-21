import axios from 'axios'

const BASE = 'https://api.spotify.com/v1/me'
const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export async function fetchPlaylists({token}, callback) {
  const response = await axios({
    method: 'get',
    url: `${BASE}/playlists`,
    ...headers(token)
  })

  callback(response.data.items)
}

export async function play({token, context}) {
  await axios({
    method: 'put',
    url: `${BASE}/player/play`,
    ...headers(token),
    ...(context ? {
      data: {
        context_uri: context
      }
    } : {})
  })
}

export async function pause({token}) {
  await axios({
    method: 'put',
    url: `${BASE}/player/pause`,
    ...headers(token)
  })
}

export async function next({token}) {
  await axios({
    method: 'post',
    url: `${BASE}/player/next`,
    ...headers(token)
  })
}

export async function previous([token]) {
  await axios({
    method: 'post',
    url: `${BASE}/player/previous`,
    ...headers(token)
  })
}

export async function fetchCurrentTrack({token}, callback) {
  const response = await axios({
    method: 'get',
    url: `${BASE}/player`,
    ...headers(token)
  })

  callback(response.data.item)
}
