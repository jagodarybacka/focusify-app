import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Button from 'components/Button';
import PlaylistsSelector from 'modules/PlaylistsSelector';

import { reducer, initialState } from './reducer';
import { STAGE } from './consts';
import './styles.scss';

export default function Setup({ setPlaylists }) {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const { currentSetup, isValid, work, rest } = state;
  const { label, playlist, time } = state[currentSetup];


  useEffect(() => {
    dispatch({ type: 'validate' });
  }, [ playlist, time ]);

  useEffect(() => {
    setPlaylists([ work, rest ]);
  }, [ setPlaylists, work, rest ]);


  const isWorkSetup = currentSetup === STAGE.WORK;
  const nextButtonContent = isWorkSetup ? 'Next' : <Link to="/player">Start session</Link>;

  return (
    <div className="Setup">
      <Header label={label}/>
      <PlaylistsSelector
        label={label}
        playlist={playlist}
        time={time}
        syncPlaylist={(value => dispatch({ type: 'setPlaylist', playlist: value }))}
        setTime={(value => dispatch({ type: 'setTime', time: value }))}/>
      <div className="Setup__buttons">
        <Button onClick={() => dispatch({ type: 'back' })} isHidden={isWorkSetup}>
          Back
        </Button>
        <Button onClick={() => dispatch({ type: 'next' })} isDisabled={isWorkSetup ? false : !isValid}>
          {nextButtonContent}
        </Button>
      </div>
    </div>
  );
}

Setup.propTypes = {
  setPlaylists: PropTypes.func
};
