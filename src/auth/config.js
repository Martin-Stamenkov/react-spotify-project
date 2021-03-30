const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "c180de395d944838a0cd98f36bc52821";
const redirectUri = "http://localhost:3000/home";
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-follow-read",
  "user-follow-modify",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative"
];

export const login = `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}&show_dialog=true`;
