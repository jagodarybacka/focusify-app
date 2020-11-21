import React from 'react'
import './styles.css'

export default function Playlist({playlist, onClick}) {
  const label = playlist.name
  const image = playlist.images[0].url

  return (
    <li
      className="Playlist"
      style={{ backgroundImage: `url(${image})`}}
      title={label}
      onClick={() => onClick(playlist)}>
    </li>
  )
}
