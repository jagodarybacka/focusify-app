import React from 'react'
import {play, pause} from '../services/spotifyService'

export default function Player(props) {
  const handlePlay = () => play({
    token: props.token,
    context: props.context
  })
  const handlePause = () => pause({
    token: props.token
  })

  return (
    <>
      <div onClick={handlePlay}>Play</div>
      <div onClick={handlePause}>Pause</div>
    </>
  )

}
