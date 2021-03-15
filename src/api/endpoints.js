export const categories = `${process.env.REACT_APP_BASE_URL}/browse/categories?offset=0&limit=10`;
export const categoryPlaylists = (id) =>
  `${process.env.REACT_APP_BASE_URL}/browse/categories/${id}/playlists?limit=8`;
