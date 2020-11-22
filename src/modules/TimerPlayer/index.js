import React, {useState, useEffect, useCallback} from 'react'
import Header from 'components/Header'
import Player from 'modules/Player'
import {useInterval} from 'hooks'
import {play, pause} from 'services/spotifyService'
import './styles.css'

const SECONDS = 1000;

export default function TimerPlayer({token, playlists, handleReset}) {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const timeoutCallback = useCallback(() => setCurrentIndex((index) => index ? 0 : 1), [setCurrentIndex])

  useEffect(() => {
    if (isPlaying) {
      const current = playlists[currentIndex]

      setCurrentPlaylist(current)
      play({
        token,
        context: current.selected.uri
      })
      setCurrentDuration(current.time * SECONDS)
    } else {
      pause({ token })
    }
  }, [playlists, token, isPlaying, currentIndex])

  useInterval(timeoutCallback, isPlaying ? currentDuration : null)

  // Unmounting cleanup - after session reset playback should be paused
  useEffect(() => () => pause({ token }), [token])

  return (
    <div className="TimerPlayer">
      {currentPlaylist && <Header label={currentPlaylist.label}/>}
      <Player
        token={token}
        handlePlay={() => setIsPlaying(true)}
        handlePause={() => setIsPlaying(false)}
        handleReset={handleReset}/>
    </div>
  )
}
