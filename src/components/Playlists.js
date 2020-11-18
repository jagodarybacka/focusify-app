import React, {useState, useEffect} from 'react'
import Playlist from './Playlist'
import {fetchPlaylists} from '../services/spotifyService'

export default function Playlists({token, onClick}){
  const [playlists, setPlaylists] = useState([])

  useEffect(() => fetchPlaylists({token}, setPlaylists), [token])

  return playlists &&
    <ul className="Playlists">
      {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} onClick={onClick}/>)}
    </ul>
}
