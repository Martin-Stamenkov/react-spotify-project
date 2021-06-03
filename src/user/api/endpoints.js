export const user = `${process.env.REACT_APP_BASE_URL}/me`;
export const followedArtists = `${process.env.REACT_APP_BASE_URL}/me/following?type=artist&limit=50`;
export const userPlaylists = `${process.env.REACT_APP_BASE_URL}/me/playlists`;
export const userAlbums = `${process.env.REACT_APP_BASE_URL}/me/albums`;
export const userPodcasts = `${process.env.REACT_APP_BASE_URL}/me/shows`;
export const checkUserArtists = (id) => `${process.env.REACT_APP_BASE_URL}/me/following/contains?type=artist&ids=${id}`;
