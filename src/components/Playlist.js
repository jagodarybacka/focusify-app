import React from 'react'
import './Playlist.css'

export default function Playlist({playlist, onClick}) {
  const label = playlist.name
  const image = playlist.images[0].url
  console.log(image)
  return (
    <li
      className="Playlist"
      style={{ backgroundImage: `url(${image})`}}
      title={label}
      onClick={() => onClick(playlist)}>
    </li>
  )
}
