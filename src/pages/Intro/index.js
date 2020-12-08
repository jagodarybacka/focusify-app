import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TokenContext from 'context/token';
import Button from 'components/Button';
import Header from 'components/Header';
import { LINK, resetToken } from 'services/spotifyAuth';
import { getDevices } from 'services/spotifyService';
import { useInterval } from 'hooks';
import { SECOND, TOKEN_ERROR } from 'mixins/consts';
import './styles.scss';

export default function Intro() {
  const token = useContext(TokenContext);
  const [ isConnected, setIsConnected ] = useState(false);
  const [ isTokenExpired, setTokenExpired ] = useState(false);

  const handleError = error => {
    if (error.status === TOKEN_ERROR) {
      setTokenExpired(true);
    }
    setIsConnected(false);
  };
  const handeSuccess = devices => {
    const hasActiveDevice = devices.some(item => item.is_active);
    setIsConnected(hasActiveDevice);
  };

  useInterval(() =>
    token && getDevices({ token },
      handeSuccess,
      handleError),
  SECOND);

  return (
    <div className="Intro">
      <Header label="Focusify"/>
      <p className="Intro__description">Welcome to <span className="is-app-name">Focusify</span>, the place where concentration meets music.</p>
      <p className="Intro__description">
        Pick your Spotify playlists - one to focus on work and one to relax during rest.
        They will switch when the time for each part of the session will pass.
        Use the music to manage your time and get things done!
      </p>
      <div className="Intro__setup">
        {
          token && !isTokenExpired ?
            <>
              {
                isConnected ?
                  <div className="Intro__info">Your Spotify app is connected.</div> :
                  <div className="Intro__info has-error">Your Spotify app is disconnected. <br/> Open Spotify and try to play any track.</div>
              }
              <Button isDisabled={!isConnected}>
                <RouterLink to="/setup">Setup session</RouterLink>
              </Button>
            </> :
            <Button onClick={() => resetToken()} isAccent>
              <a href={LINK}>Login to spotify</a>
            </Button>
        }
      </div>
    </div>
  );
}
