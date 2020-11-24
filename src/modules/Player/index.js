import React, { useState, useCallback } from 'react';
import { useInterval } from 'hooks';
import Button from 'components/Button';
import { fetchCurrentTrack, next, previous } from 'services/spotifyService';
import './styles.css';

const SECOND = 1000;

export default function Player({ token, handlePlay, handlePause, handleReset }) {
  const [ track, setTrack ] = useState(null);
  const [ isPlaying, setIsPlaying ] = useState(false);

  const fetchTrack = useCallback(() => {
    fetchCurrentTrack({ token }, item => {
      if (item && item?.id !== track?.id) {
        setTrack(item);
      }
    });
  }, [ token, track ]);

  useInterval(fetchTrack, isPlaying ? SECOND : null);

  function play() {
    setIsPlaying(true);
    handlePlay();
  }

  function pause() {
    setIsPlaying(false);
    handlePause();
  }

  function prevTrack() {
    previous({ token });
  }

  function nextTrack() {
    next({ token });
  }

  function reset() {
    pause();
    handleReset();
  }

  const playStateButtons = (
    <>
      <Button onClick={prevTrack}>Prev</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={nextTrack}>Next</Button>
    </>
  );
  const bgImage = track?.album.images[0].url;
  const trackArtists = track?.artists.map(artist => artist.name).join(', ');
  const trackLabel = `${ trackArtists } - ${ track?.name }`;

  return (
    <div className="Player">
      <Button onClick={reset}>X</Button>
      <div className="Player__cover" style={bgImage && { backgroundImage: `url(${ bgImage })` }}></div>
      {
        isPlaying && track && <div className="Player__label" title={trackLabel}>{trackLabel}</div>
      }
      <div className="Player__buttons">
        {isPlaying ? playStateButtons : <Button onClick={play}>Play</Button>}
      </div>
    </div>
  );
}
