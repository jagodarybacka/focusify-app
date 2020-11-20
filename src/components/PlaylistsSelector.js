import React, {useState} from 'react'
import Playlists from './Playlists'
import EditBox from './EditBox'
import InputNumber from './InputNumber'
import './PlaylistsSelector.css'

export default function PlaylistsSelector({token, selected, syncSelected, label}) {
  const [showPlaylists, setShowPlaylists] = useState(false)
  const bgImage = selected && selected.images[0].url

  const selectPlaylist = (playlist) => {
    syncSelected(playlist)
    setShowPlaylists(false)
  }

  return (
    <div className="PlaylistsSelector" style={bgImage && { backgroundImage: `url(${bgImage})`}}>
      {
        !showPlaylists &&
          <div className="PlaylistsSelector__form">
            <EditBox
              label="Playlist"
              content={selected?.name || "No playlist selected. Pick one..."}
              onClick={() => setShowPlaylists(true)}/>
            <InputNumber
              label="Duration"
              placeholder="Set duration..."
              value={45}/>
          </div>
      }

      { showPlaylists && <Playlists token={token} onClick={selectPlaylist}/> }
    </div>
  )
}
