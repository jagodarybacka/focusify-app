import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Playlists from 'modules/Playlists';
import EditBox from 'components/EditBox';
import InputNumber from 'components/InputNumber';
import './styles.scss';

export default function PlaylistsSelector({ token, playlist, syncPlaylist, label, time, setTime }) {
  const [ showPlaylists, setShowPlaylists ] = useState(false);
  const bgImage = playlist && playlist.images[0].url;

  const selectPlaylist = item => {
    syncPlaylist(item);
    setShowPlaylists(false);
  };

  useEffect(() => () => setShowPlaylists(false), [label]); // Cleanup when session part changes

  return (
    <div className="PlaylistsSelector" style={bgImage && { backgroundImage: `url(${ bgImage })` }}>
      {
        !showPlaylists &&
          <div className="PlaylistsSelector__form">
            <EditBox
              label="Playlist"
              content={playlist?.name || 'No playlist selected. Pick one...'}
              onClick={() => setShowPlaylists(true)}/>
            <InputNumber
              label="Duration"
              suffix="min"
              value={time}
              setValue={setTime}
              max={120}
              min={5}/>
          </div>
      }

      { showPlaylists && <Playlists token={token} onClick={selectPlaylist}/> }
    </div>
  );
}

PlaylistsSelector.propTypes = {
  token: PropTypes.string,
  playlist: PropTypes.shape({
    images: PropTypes.array,
    name: PropTypes.string
  }),
  syncPlaylist: PropTypes.func,
  label: PropTypes.string,
  time: PropTypes.oneOfType([ PropTypes.number, PropTypes.oneOf(['']) ]),
  setTime: PropTypes.func
};
