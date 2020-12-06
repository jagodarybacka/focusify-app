import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
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

  useEffect(() => {
    const currentToken = getToken();

    currentToken && setToken(currentToken);
  }, []);

  return (
    <Router>
      <div className="App">
        <TokenContext.Provider value={token}>
          <Switch>
            <Route path="/setup">
              <Setup
                setPlaylists={setPlaylists}/>
            </Route>
            <Route path="/player">
              <Player playlists={playlists}/>
            </Route>
            <Route path="/">
              <Intro />
            </Route>
          </Switch>
        </TokenContext.Provider>
      </div>
    </Router>
  );
}

export default App;
