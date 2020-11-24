import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function Playlist({ playlist, onClick }) {
  const label = playlist.name;
  const image = playlist.images[0].url;

  return (
    <li
      className="Playlist"
      style={{ backgroundImage: `url(${ image })` }}
      title={label}
      onClick={() => onClick(playlist)}>
    </li>
  );
}

Playlist.propTypes = {
  playlist: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.array
  }),
  onClick: PropTypes.func
};
