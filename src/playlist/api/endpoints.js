//GET

export const playlistInfo = (playlist_id) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}`;

// POST

export const addPlaylist = (user_id) =>
  `${process.env.REACT_APP_BASE_URL}/users/${user_id}/playlists`;

// DELETE

export const removePlaylist = (playlist_id) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}/followers`;


