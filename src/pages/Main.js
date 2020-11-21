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
  const [timeWork, setTimeWork] = useState(45)
  const [selectedForRest, setSelectedForRest] = useState(null)
  const [timeRest, setTimeRest] = useState(15)
  const [showPlayer, setShowPlayer] = useState(false)
  const [setupIndex, setSetupIndex] = useState(0)

  const setup = [
    {label: 'Work', selected: selectedForWork, syncSelected: setSelectedForWork, buttonLabel: 'Next: rest time',  onNext: () => setSetupIndex(1), time: timeWork, setTime: setTimeWork},
    {label: 'Rest', selected: selectedForRest, syncSelected: setSelectedForRest, buttonLabel: 'Start session', onNext: () => setShowPlayer(true), time: timeRest, setTime: setTimeRest, isDisabled: !(selectedForRest && selectedForWork)}
  ]

  useEffect(() => {
    const currentToken = getToken();

    currentToken && setToken(currentToken)
  }, [])

  if (!token) {
    return <Link href={LINK}>Login to spotify</Link>
  }

  if (showPlayer) {
    return <TimerPlayer token={token} playlists={setup} />
  }

  const {label, buttonLabel, onNext, isDisabled, ...selectorProps} = setup[setupIndex]
  const showPrevButton = setupIndex === 1

  return (
    <div className="Main">
      <Header label={label}/>
      <PlaylistsSelector token={token} {...selectorProps}/>
      <div className="Main__buttons">
        <Button onClick={() => setSetupIndex(0)} isHidden={!showPrevButton}>Back</Button>
        <Button onClick={onNext} isDisabled={isDisabled}>{buttonLabel}</Button>
      </div>
    </div>
    )
}
