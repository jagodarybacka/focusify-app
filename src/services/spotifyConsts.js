const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '8f7580eb52f24096a8c0be232f9dd439'
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative"
];

export const LINK = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
export const getToken = () => {
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
    window.location.hash = ""

    return hash.access_token
}
