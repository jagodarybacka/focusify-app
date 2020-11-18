import React, {useState, useEffect} from 'react'
import Link from '../components/Link'
import PlaylistsSelector from '../components/PlaylistsSelector'
import TimerPlayer from '../components/TimerPlayer'
import {LINK} from '../services/spotifyConsts'
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
    return <Link href={LINK}>Login to spotify</Link>
  }

  if (selectedForWork && selectedForRest) {
    const playlists = [selectedForWork, selectedForRest]
    return <TimerPlayer token={token} playlists={playlists} />
  }

  return (
    <>
      <PlaylistsSelector token={token} syncSelected={setSelectedForWork} label="Work"/>
      <PlaylistsSelector token={token} syncSelected={setSelectedForRest} label="Rest"/>
    </>
    )
}
