import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import TokenContext from 'context/token';
import { getToken } from 'services/spotifyAuth';

import Intro from 'pages/Intro';
import Player from 'pages/Player';
import Setup from 'pages/Setup';
import './App.scss';

function App() {
  const [ token, setToken ] = useState('');
  const [ playlists, setPlaylists ] = useState([]);

  const location = useLocation();
  const transitions = useTransition(location, current => current.pathname, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useEffect(() => {
    const currentToken = getToken();

    currentToken && setToken(currentToken);
  }, []);

  return transitions.map(({ item: itemLocation, props, key }) => (
    <animated.div key={key} style={props} className="App">
      <TokenContext.Provider value={token}>
        <Switch location={itemLocation}>
          <Route path="/setup">
            <Setup
              setPlaylists={setPlaylists}/>
          </Route>
          <Route path="/player">
            <Player playlists={playlists}/>
          </Route>
          <Route exact path="/">
            <Intro />
          </Route>
        </Switch>
      </TokenContext.Provider>
    </animated.div>
  ));
}

export default App;
