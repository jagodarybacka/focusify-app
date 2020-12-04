import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Playlist from 'components/Playlist';
import Error from 'components/Error';
import { fetchPlaylists } from 'services/spotifyService';
import './styles.scss';

export default function Playlists({ token, onClick }){
  const [ playlists, setPlaylists ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => fetchPlaylists({ token }, setPlaylists, setError), [token]);

  if (error) {
    return <Error error={error}/>;
  }

  if (playlists && !playlists.length) {
    const noPlaylistsError = {
      message: 'Your Spotify account has no playlists saved. Go to Spotify application and save some playlists.'
    };

    return <Error error={noPlaylistsError}/>;
  }

  return playlists &&
    <ul className="Playlists">
      {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} onClick={onClick}/>)}
    </ul>;
}

Playlists.propTypes = {
  token: PropTypes.string,
  onClick: PropTypes.func
};
