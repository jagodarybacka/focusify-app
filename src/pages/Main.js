import React, {useState, useEffect} from 'react'
import Link from '../components/Link'
import PlaylistsSelector from '../components/PlaylistsSelector'
import TimerPlayer from '../components/TimerPlayer'
import Header from '../components/Header'
import Button from '../components/Button'
import {LINK} from '../services/spotifyConsts'
import {getToken} from '../services/spotifyConsts'
import './Main.css'

export default function Main() {
  const [token, setToken] = useState('');
  const [selectedForWork, setSelectedForWork] = useState(null)
  const [selectedForRest, setSelectedForRest] = useState(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [setupIndex, setSetupIndex] = useState(0)

  const setup = [
    {label: 'Work', selected: selectedForWork, syncSelected: setSelectedForWork, buttonLabel: 'Next: rest time',  onNext: () => setSetupIndex(1)},
    {label: 'Rest', selected: selectedForRest, syncSelected: setSelectedForRest, buttonLabel: 'Start session', onNext: () => setShowPlayer(true), isDisabled: !(selectedForRest && selectedForWork)}
  ]

  useEffect(() => {
    const currentToken = getToken();

    currentToken && setToken(currentToken)
  }, [])

  if (!token) {
    return <Link href={LINK}>Login to spotify</Link>
  }

  if (showPlayer) {
    const playlists = [selectedForWork, selectedForRest]
    return <TimerPlayer token={token} playlists={playlists} />
  }

  const {label, buttonLabel, onNext, isDisabled, ...selectorProps} = setup[setupIndex]
  const showPrevButton = setupIndex === 1

  return (
    <div className="Main">
      <Header label={label}/>
      <PlaylistsSelector token={token} {...selectorProps}/>
      <div className="Main__buttons">
        <Button label="Back" onClick={() => setSetupIndex(0)} isHidden={!showPrevButton}/>
        <Button label={buttonLabel} onClick={onNext} isDisabled={isDisabled}/>
      </div>
    </div>
    )
}
