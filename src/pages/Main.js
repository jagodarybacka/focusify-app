import React, {useState, useEffect} from 'react'
import Login from '../components/Login'
import PlaylistsSelector from '../components/PlaylistsSelector'
import TimerPlayer from '../components/TimerPlayer'
import {getToken} from '../services/spotifyConsts'

export default function Main() {
  const [token, setToken] = useState('');
  const [selectedForWork, setSelectedForWork] = useState(null)
  const [selectedForRest, setSelectedForRest] = useState(null)

  useEffect(() => {
    const currentToken = getToken();

    currentToken && setToken(currentToken)
  }, [])

  if (!token) {
    return <Login />
  }

  if (selectedForWork && selectedForRest) {
    const playlists = [selectedForWork, selectedForRest]
    return <TimerPlayer token={token} playlists={playlists} />
  }

  return (
    <>
      <PlaylistsSelector token={token} setSelected={setSelectedForWork}/>
      <PlaylistsSelector token={token} setSelected={setSelectedForRest}/>
    </>
    )
}
