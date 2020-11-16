import React from 'react'
import axios from 'axios'

export default function Player(props) {
  async function handlePlay() {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
  }


  return <div onClick={handlePlay}>Play</div>

}
