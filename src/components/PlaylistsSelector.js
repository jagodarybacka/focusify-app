import React from 'react'
import Playlists from './Playlists'

export default function PlaylistsSelector({token, setSelected}) {
  return (
    <>
      Select playlist to play

      <Playlists
        token={token}
        onClick={setSelected}/>
    </>
  )
}
