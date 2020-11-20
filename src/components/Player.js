import React, {useState, useEffect} from 'react'
import Button from './Button'
import {fetchCurrentTrack} from '../services/spotifyService'
import './Player.css'

export default function Player({token, handlePlay, handlePause}) {
  const [track, setTrack] = useState(null)
  const [bgImage, setBgImage] = useState(null)

  useEffect(() => {
    const intervalId = setInterval(() => fetchTrack(), 1000)

    return () => clearInterval(intervalId)
  }, [])

  function fetchTrack() {
    fetchCurrentTrack({token}, (item) => {
      setTrack(item)
      setBgImage(item.album.images[0].url)
    })
  }

  function play() {
    fetchTrack()
    handlePlay()
  }

  return (
    <div className="Player">
      <div className="Player__cover" style={bgImage && { backgroundImage: `url(${bgImage})`}}></div>
      <div className="Player__buttons">
        <Button onClick={play}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
      </div>
    </div>
  )

}
