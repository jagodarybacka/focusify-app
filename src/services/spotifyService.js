import axios from 'axios'

export async function fetchPlaylists({token}, callback) {
  const response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  callback(response.data.items)
}

export async function play({token, context}) {
  await axios({
    method: 'put',
    url: 'https://api.spotify.com/v1/me/player/play',
    headers: {
      Authorization: `Bearer ${token}`
    },
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
    url: 'https://api.spotify.com/v1/me/player/pause',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function fetchCurrentTrack({token}, callback) {
  const response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  callback(response.data.item)
}
