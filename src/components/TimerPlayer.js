import React, {useState} from 'react'
import Player from './Player'
import Header from './Header'
import {play, pause} from '../services/spotifyService'
import './TimerPlayer.css'

export default function TimerPlayer({token, playlists}) {
  const [timeoutId, setTimeoutId] = useState(null)
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const delay = 10_000;

  const playFn = (playlist) => play({
    token,
    context: playlist.uri
  })

  const startTimer = function playTimer(index) {
    const current = playlists[index]
    setCurrentPlaylist(current)
    playFn(current.selected)

    setTimeoutId(setTimeout(() => playTimer(index ? 0 : 1), delay))
  }

  const pauseTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      pause({ token })
    }
  }

  return (
    <div className="TimerPlayer">
      {currentPlaylist && <Header label={currentPlaylist.label}/>}
      <Player token={token} handlePlay={() => startTimer(0)} handlePause={pauseTimer}/>
    </div>
  )
}
