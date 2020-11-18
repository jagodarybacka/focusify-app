import React, {useState, useEffect} from 'react'
import Playlists from './Playlists'
import EditBox from './EditBox'
import InputNumber from './InputNumber'

export default function PlaylistsSelector({token, syncSelected, label}) {
  const [selected, setSelected] = useState(null)
  const [showPlaylists, setShowPlaylists] = useState(false)

  useEffect(() => syncSelected(selected), [selected, syncSelected])

  const selectPlaylist = (playlist) => {
    setSelected(playlist)
    setShowPlaylists(false)
  }

  return (
    <div className="PlaylistsSelector">
      <header className="PlaylistsSelector__header">{label}</header>

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
