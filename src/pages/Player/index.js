import React from 'react';
import PropTypes from 'prop-types';
import TimerPlayer from 'modules/TimerPlayer';

export default function Player({ playlists, handleReset }) {
  return (
    <TimerPlayer
      playlists={playlists}
      handleReset={handleReset} />
  );
}

Player.propTypes = {
  playlists: PropTypes.array,
  handleReset: PropTypes.func
};
