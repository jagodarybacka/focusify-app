import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Playlist from 'components/Playlist';
import { fetchPlaylists } from 'services/spotifyService';
import './styles.css';

export default function Playlists({ token, onClick }){
  const [ playlists, setPlaylists ] = useState([]);

  useEffect(() => fetchPlaylists({ token }, setPlaylists), [token]);

  return playlists &&
    <ul className="Playlists">
      {playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} onClick={onClick}/>)}
    </ul>;
}

Playlists.propTypes = {
  token: PropTypes.string,
  onClick: PropTypes.func
};
