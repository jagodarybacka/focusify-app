import React, {useState, useEffect} from 'react'
import Link from 'components/Link'
import Header from 'components/Header'
import Button from 'components/Button'
import PlaylistsSelector from 'modules/PlaylistsSelector'
import TimerPlayer from 'modules/TimerPlayer'
import {LINK} from 'services/spotifyConsts'
import {getToken} from 'services/spotifyConsts'
import './styles.css'

const DEFAULT_WORK_TIME = 45
const DEFAULT_REST_TIME = 15

export default function Main() {
  const [token, setToken] = useState('');
  const [selectedForWork, setSelectedForWork] = useState(null)
  const [timeWork, setTimeWork] = useState(DEFAULT_WORK_TIME)
  const [selectedForRest, setSelectedForRest] = useState(null)
  const [timeRest, setTimeRest] = useState(DEFAULT_REST_TIME)
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

  function resetSession() {
    setSelectedForWork(null)
    setSelectedForRest(null)
    setTimeWork(DEFAULT_WORK_TIME)
    setTimeRest(DEFAULT_REST_TIME)
    setShowPlayer(false)
    setSetupIndex(0)
  }

  if (!token) {
    return <Link href={LINK}>Login to spotify</Link>
  }

  if (showPlayer) {
    return <TimerPlayer token={token} playlists={setup} handleReset={resetSession}/>
  }

  const {label, buttonLabel, onNext, isDisabled, ...selectorProps} = setup[setupIndex]
  const showPrevButton = setupIndex === 1

  return (
    <div className="Main">
      <Header label={label}/>
      <PlaylistsSelector token={token} label={label} {...selectorProps}/>
      <div className="Main__buttons">
        <Button onClick={() => setSetupIndex(0)} isHidden={!showPrevButton}>Back</Button>
        <Button onClick={onNext} isDisabled={isDisabled}>{buttonLabel}</Button>
      </div>
    </div>
    )
}
