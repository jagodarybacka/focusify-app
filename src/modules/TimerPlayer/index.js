import React, { useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Error from 'components/Error';
import Player from 'modules/Player';
import TokenContext from 'context/token';
import { useInterval } from 'hooks';
import { play, pause } from 'services/spotifyService';
import { secondsToMinutes } from './utils';
import { reducer, initialState } from './reducer';
import { SECOND, noop } from 'mixins/consts';
import './styles.scss';

export default function TimerPlayer({ playlists, handleReset }) {
  const token = useContext(TokenContext);
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { isPlaying, playlist, currentIndex, duration, timeRemaining, error } = state;

  useEffect(() => {
    if (isPlaying) {
      const current = playlists[currentIndex];

      play({ token, context: current.playlist.uri },
        noop,
        err => dispatch({ type: 'error', error: err }));

      dispatch({ type: 'setPlaylist', playlist: current });
    } else if (isPlaying !== null) { // Skip if player has not been played yet
      pause({ token },
        noop,
        err => dispatch({ type: 'error', error: err }));
    }
  }, [ playlists, token, isPlaying, currentIndex ]);

  useInterval(() => dispatch({ type: 'toggleSession' }), isPlaying ? duration : null);

  useInterval(() => dispatch({ type: 'decreaseTime' }), isPlaying ? SECOND : null);

  // Unmounting cleanup - after session reset playback should be paused
  useEffect(() => () => pause({ token }), [token]);

  return (
    <div className="TimerPlayer">
      <Header label={playlist?.label || 'Session'}/>
      <div className="TimerPlayer__wrapper">
        <Player
          error={error}
          handleError={err => dispatch({ type: 'error', error: err })}
          handlePlay={() => dispatch({ type: 'togglePlay', isPlaying: true })}
          handlePause={() => dispatch({ type: 'togglePlay', isPlaying: false })}
          handleReset={handleReset}/>

        {isPlaying && playlist &&
          <div className="TimerPlayer__time">
            {secondsToMinutes(timeRemaining)}
            <div className="TimerPlayer__time-description">to the end of the {playlist.label} session</div>
          </div>}

        {error && <Error error={error} />}
      </div>
    </div>
  );
}

TimerPlayer.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.number,
    playlist: PropTypes.object
  })),
  handleReset: PropTypes.func
};
