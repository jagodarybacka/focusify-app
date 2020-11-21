import React, {useState, useEffect, useCallback} from 'react'
import Button from 'components/Button'
import {fetchCurrentTrack, next, previous} from 'services/spotifyService'
import './styles.css'

export default function Player({token, handlePlay, handlePause}) {
  const [track, setTrack] = useState(null)
  const [bgImage, setBgImage] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const fetchTrack = useCallback(() => {
    fetchCurrentTrack({ token }, (item) => {
      if (item) {
        setTrack(item)
        setBgImage(item.album.images[0].url)
      }
    })
  }, [token])

  useEffect(() => {
    const intervalId = isPlaying && setInterval(() => fetchTrack(), 1000)

    return () => {
      clearInterval(intervalId)
      console.log('clear')
    }
  }, [isPlaying, fetchTrack])


  function play() {
    setIsPlaying(true)
    handlePlay()
  }

  function pause() {
    setIsPlaying(false)
    handlePause()
  }

  function prevTrack() {
    previous({token})
  }

  function nextTrack() {
    next({token})
  }

  const playStateButtons = (
    <>
      <Button onClick={prevTrack}>Prev</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={nextTrack}>Next</Button>
    </>
  )
  return (
    <div className="Player">
      <div className="Player__cover" style={bgImage && { backgroundImage: `url(${bgImage})`}}></div>
      <div className="Player__buttons">
        {isPlaying ? playStateButtons : <Button onClick={play}>Play</Button>}
      </div>
    </div>
  )

}
