//GET

export const playlistInfo = (playlist_id) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}`;

export const checkPlaylist = (playlist_id, ids) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}/followers/contains?ids=${ids}`;

// POST

export const addPlaylist = (user_id) =>
  `${process.env.REACT_APP_BASE_URL}/users/${user_id}/playlists`;

export const addTrack = (playlist_id, uri) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}/tracks?uris=${uri}`;

// DELETE

export const removePlaylist = (playlist_id) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}/followers`;

// PUT

export const editPlaylist = (playlist_id) => `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}`

export const followPlaylist = (playlist_id) =>
  `${process.env.REACT_APP_BASE_URL}/playlists/${playlist_id}/followers`;


