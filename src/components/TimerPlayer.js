import React, {useState} from 'react'
import {play, pause} from '../services/spotifyService'

export default function TimerPlayer({token, playlists}) {
  const [timeoutId, setTimeoutId] = useState(null)
  const delay = 10_000;

  const playFn = (playlist) => play({
    token,
    context: playlist.uri
  })

  const startTimer = function playTimer(index) {
    playFn(playlists[index])

    setTimeoutId(setTimeout(() => playTimer(index ? 1 : 0), delay))
  }

  const pauseTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      pause({ token })
    }
  }

  return (
    <>
      <div onClick={() => startTimer(0)}>Play</div>
      <div onClick={pauseTimer}>Pause</div>
    </>
  )
}
