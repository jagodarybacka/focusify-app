import React, { useEffect, useReducer } from 'react';
import Link from 'components/Link';
import Header from 'components/Header';
import Button from 'components/Button';
import PlaylistsSelector from 'modules/PlaylistsSelector';
import TimerPlayer from 'modules/TimerPlayer';
import { LINK, getToken } from 'services/spotifyConsts';
import { reducer, initialState } from './reducer';
import { STAGE } from './consts';
import './styles.scss';

export default function Main() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const { token, currentSetup, isValid, showPlayer, work, rest } = state;
  const { label, nextButtonLabel, playlist, time } = state[currentSetup];
  const canGoBack = currentSetup === STAGE.REST;
  const canGoNext = currentSetup === STAGE.WORK || isValid;

  useEffect(() => {
    const currentToken = getToken();

    currentToken && dispatch({ type: 'setToken', token: currentToken });
  }, []);

  useEffect(() => {
    dispatch({ type: 'validate' });
  }, [ playlist, time ]);


  if (!token) {
    return <Link href={LINK}>Login to spotify</Link>;
  }

  if (showPlayer) {
    return (
      <TimerPlayer
        token={token}
        playlists={[ work, rest ]}
        handleReset={() => dispatch({ type: 'reset' })} />
    );
  }

  return (
    <div className="Main">
      <Header label={label}/>
      <PlaylistsSelector
        token={token}
        label={label}
        playlist={playlist}
        time={time}
        syncPlaylist={(value => dispatch({ type: 'setPlaylist', playlist: value }))}
        setTime={(value => dispatch({ type: 'setTime', time: value }))}/>
      <div className="Main__buttons">
        <Button onClick={() => dispatch({ type: 'back' })} isHidden={!canGoBack}>Back</Button>
        <Button onClick={() => dispatch({ type: 'next' })} isDisabled={!canGoNext}>{nextButtonLabel}</Button>
      </div>
    </div>
  );
}
