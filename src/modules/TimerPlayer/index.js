import React, {useState} from 'react'
import Header from 'components/Header'
import Player from 'modules/Player'
import {play, pause} from 'services/spotifyService'
import './styles.css'

export default function TimerPlayer({token, playlists, handleReset}) {
  const [timeoutId, setTimeoutId] = useState(null)
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const playFn = (playlist) => play({
    token,
    context: playlist.uri
  })

  const startTimer = function playTimer(index) {
    const current = playlists[index]
    setCurrentPlaylist(current)
    playFn(current.selected)

    setTimeoutId(setTimeout(() => playTimer(index ? 0 : 1), current.time * 1000))
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
      <Player
        token={token}
        handlePlay={() => startTimer(0)}
        handlePause={pauseTimer}
        handleReset={handleReset}/>
    </div>
  )
}
