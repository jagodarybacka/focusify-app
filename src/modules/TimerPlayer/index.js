import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Player from 'modules/Player';
import { useInterval } from 'hooks';
import { play, pause } from 'services/spotifyService';
import { secondsToMinutes } from './utils';
import { reducer, initialState } from './reducer';
import { SECOND } from './consts';
import './styles.scss';

export default function TimerPlayer({ token, playlists, handleReset }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { isPlaying, playlist, currentIndex, duration, timeRemaining } = state;

  useEffect(() => {
    if (isPlaying) {
      const current = playlists[currentIndex];

      play({
        token,
        context: current.playlist.uri
      });
      dispatch({ type: 'setPlaylist', playlist: current });
    } else if (isPlaying !== null) { // Skip if player has not been played yet
      pause({ token });
    }
  }, [ playlists, token, isPlaying, currentIndex ]);

  useInterval(() => dispatch({ type: 'toggleSession' }), isPlaying ? duration : null);

  useInterval(() => dispatch({ type: 'decreaseTime' }), isPlaying ? SECOND : null);

  // Unmounting cleanup - after session reset playback should be paused
  useEffect(() => () => pause({ token }), [token]);

  return (
    <div className="TimerPlayer">
      {playlist && <Header label={playlist.label}/>}
      <div className="TimerPlayer__wrapper">
        <Player
          token={token}
          handlePlay={() => dispatch({ type: 'togglePlay', isPlaying: true })}
          handlePause={() => dispatch({ type: 'togglePlay', isPlaying: false })}
          handleReset={handleReset}/>
        {isPlaying && playlist &&
          <div className="TimerPlayer__time">
            {secondsToMinutes(timeRemaining)}
            <div className="TimerPlayer__time-description">to the end of the {playlist.label} session</div>
          </div>}
      </div>
    </div>
  );
}

TimerPlayer.propTypes = {
  token: PropTypes.string,
  playlists: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.number,
    playlist: PropTypes.object
  })),
  handleReset: PropTypes.func
};
