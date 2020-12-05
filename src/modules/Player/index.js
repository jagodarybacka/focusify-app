import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInterval } from 'hooks';
import Button from 'components/Button';
import { getPlayer, next, previous } from 'services/spotifyService';
import Icon from 'components/Icon';
import * as Icons from 'icons';
import './styles.scss';

const SECOND = 1000;
const noop = () => {};

export default function Player({ token, handlePlay, handlePause, handleReset, handleError, error }) {
  const [ track, setTrack ] = useState(null);
  const [ isPlaying, setIsPlaying ] = useState(false);

  const fetchTrack = useCallback(() => {
    getPlayer({ token }, response => {
      const { item } = response.data;
      if (item && item?.id !== track?.id) {
        setTrack(item);
      }
    }, noop, handleError );
  }, [ token, track, handleError ]);

  useInterval(fetchTrack, isPlaying ? SECOND : null);

  useEffect(() => {
    if (error) {
      setIsPlaying(false);
    }
  }, [error]);

  function play() {
    setIsPlaying(true);
    handlePlay();
  }

  function pause() {
    setIsPlaying(false);
    handlePause();
  }

  function prevTrack() {
    previous({ token }, noop, handleError);
  }

  function nextTrack() {
    next({ token }, noop, handleError);
  }

  function reset() {
    pause();
    handleReset();
  }

  const playStateButtons = (
    <>
      <Button onClick={prevTrack}><Icon render={() => <Icons.Prev />} /></Button>
      <Button onClick={pause}><Icon render={() => <Icons.Pause />} /></Button>
      <Button onClick={nextTrack}><Icon render={() => <Icons.Next />} /></Button>
    </>
  );
  const bgImage = track?.album.images[0].url;
  const trackArtists = track?.artists.map(artist => artist.name).join(', ');
  const trackLabel = `${ trackArtists } - ${ track?.name }`;

  return (
    <div className="Player">
      <Button onClick={reset}><Icon render={() => <Icons.Back />} /></Button>
      <div className="Player__cover" style={bgImage && { backgroundImage: `url(${ bgImage })` }}></div>
      {
        isPlaying && track && <div className="Player__label" title={trackLabel}>{trackLabel}</div>
      }
      <div className="Player__buttons">
        {isPlaying ? playStateButtons : <Button onClick={play}><Icon render={() => <Icons.Play />} /></Button>}
      </div>
    </div>
  );
}

Player.propTypes = {
  token: PropTypes.string,
  error: PropTypes.object,
  handleError: PropTypes.func,
  handlePlay: PropTypes.func,
  handlePause: PropTypes.func,
  handleReset: PropTypes.func
};
