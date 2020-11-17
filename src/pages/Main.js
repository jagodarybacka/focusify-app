import React, {useState, useEffect} from 'react'
import Login from '../components/Login'
import Playlists from '../components/Playlists'
import {getToken} from '../services/spotifyConsts'

export default function Main() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const currentToken = getToken();

    currentToken && setToken(currentToken)
  }, [])

  if (!token) {
    return <Login />
  }

  return <Playlists token={token}/>
}
