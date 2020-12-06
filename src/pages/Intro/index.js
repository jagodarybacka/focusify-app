import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TokenContext from 'context/token';
import Link from 'components/Link';
import { LINK } from 'services/spotifyAuth';


export default function Intro() {
  const token = useContext(TokenContext);

  return (
    <div className="Intro">
      <p className="Intro__description">Focusify</p>
      {
        token ?
          <>
            <div>Your Spotify app is connected</div>
            <RouterLink to="/setup">Setup session</RouterLink>
          </> :
          <Link href={LINK}>Login to spotify</Link>
      }
    </div>
  );
}
