import React, { useEffect, useReducer } from 'react';
import Link from 'components/Link';
import Header from 'components/Header';
import Button from 'components/Button';
import PlaylistsSelector from 'modules/PlaylistsSelector';
import TimerPlayer from 'modules/TimerPlayer';
import { LINK, getToken } from 'services/spotifyConsts';
import { isInRange } from 'utils';
import './styles.scss';

const DEFAULT_WORK_TIME = 45;
const DEFAULT_REST_TIME = 15;
const MIN_TIME = 5;
const MAX_TIME = 120;

function validate({ work, rest }) {
  return !!(
    work.playlist &&
    rest.playlist &&
    isInRange(work.duration, MIN_TIME, MAX_TIME) &&
    isInRange(rest.duration, MIN_TIME, MAX_TIME));
}


const initialState = {
  token: '',
  isValid: false,
  currentSetup: 'work',
  showPlayer: false,
  work: {
    label: 'Work',
    playlist: null,
    nextButtonLabel: 'Next: rest time',
    time: DEFAULT_WORK_TIME
  },
  rest: {
    label: 'Rest',
    playlist: null,
    nextButtonLabel: 'Start session',
    time: DEFAULT_REST_TIME
  }
};

function reducer(state, action) {
  switch (action.type) {
  case 'setToken':
    return {
      ...state,
      token: action.token
    };

  case 'validate':
    return {
      ...state,
      isValid: validate(state)
    };

  case 'back':
    return {
      ...state,
      currentSetup: 'work'
    };

  case 'next':
    if (state.currentSetup === 'work') {
      return {
        ...state,
        currentSetup: 'rest'
      };
    }

    return {
      ...state,
      showPlayer: true
    };

  case 'setPlaylist':
    return {
      ...state,
      [state.currentSetup]: {
        ...state[state.currentSetup],
        playlist: action.playlist
      }
    };

  case 'setTime':
    return {
      ...state,
      [state.currentSetup]: {
        ...state[state.currentSetup],
        time: action.time
      }
    };

  case 'reset':
    return initialState;

  default:
    throw new Error(`Unknown action: ${ action.type }`);
  }
}

export default function Main() {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { token, currentSetup, work, rest, isValid, showPlayer } = state;

  useEffect(() => {
    const currentToken = getToken();

    currentToken && dispatch({ type: 'setToken', token: currentToken });
  }, []);

  useEffect(() => {
    dispatch({ type: 'validate' });
  }, [ work, rest ]);


  if (!token) {
    return <Link href={LINK}>Login to spotify</Link>;
  }

  if (showPlayer) {
    return <TimerPlayer token={token} playlists={[ work, rest ]} handleReset={() => dispatch({ type: 'reset' })}/>;
  }

  const { label, nextButtonLabel, playlist, time } = state[currentSetup];
  const canGoBack = currentSetup === 'rest';
  const canGoNext = currentSetup === 'work' || isValid;

  return (
    <div className="Main">
      <Header label={label}/>
      <PlaylistsSelector
        token={token}
        label={label}
        playlist={playlist}
        time={time}
        syncPlaylist={(value => dispatch({ type: 'setPlaylist', value }))}
        setTime={(value => dispatch({ type: 'setTime', value }))}/>
      <div className="Main__buttons">
        <Button onClick={() => dispatch({ type: 'back' })} isHidden={!canGoBack}>Back</Button>
        <Button onClick={() => dispatch({ type: 'next' })} isDisabled={!canGoNext}>{nextButtonLabel}</Button>
      </div>
    </div>
  );
}
