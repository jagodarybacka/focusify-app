import React, {useState, useEffect} from 'react'
import {fetchPlaylists} from '../services/spotifyService'


export default function Playlists({token, onClick}){
  const [playlists, setPlaylists] = useState([])

  useEffect(() => fetchPlaylists({token}, setPlaylists), [token])

  return playlists && playlists.map(playlist =>
    <div
    key={playlist.id}
    onClick={() => onClick(playlist)}>{playlist.name}></div>)
}
