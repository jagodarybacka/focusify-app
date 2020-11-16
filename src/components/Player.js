import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Player(props) {
  const [playlists, setPlaylists] = useState([])

  async function handlePlay() {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
  }

  async function handlePause() {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
  }

  async function handlePlayPlaylist(playlist) {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
      data: {
        context_uri: playlist.uri
      },
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
  }

  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      })

      setPlaylists(response.data.items)
    }

    fetchPlaylist();
  }, [props.token])


  return (
    <>
      <div onClick={handlePlay}>Play</div>
      <div onClick={handlePause}>Pause</div>
      {playlists &&
        playlists.map(playlist => <div key={playlist.id} onClick={() => handlePlayPlaylist(playlist)}>{playlist.name}</div>)}
    </>
  )

}
