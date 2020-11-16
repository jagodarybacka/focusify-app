import React, {useState, useEffect} from 'react'
import Player from './Player'

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '8f7580eb52f24096a8c0be232f9dd439'
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-modify-playback-state",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

export default function Login(props) {
  const [token, setToken] = useState('');

  const link = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

  useEffect(() => {
    const currentToken = hash.access_token;
    currentToken && setToken(currentToken)
  }, [token])


  if (!token) {
    return <a href={link}>Login to spotify</a>
  }

  return <Player token={token}/>
}
