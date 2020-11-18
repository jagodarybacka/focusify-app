import React from 'react'

export default function Playlist({playlist, onClick}) {
  const label = playlist.name

  return (
    <li className="Playlist" onClick={() => onClick(playlist)}>
      <span>{label}</span>
    </li>
  )
}
