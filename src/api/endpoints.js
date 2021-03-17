export const categories = (limit) => `${process.env.REACT_APP_BASE_URL}/browse/categories?offset=0&limit=${limit}`;
export const categoryPlaylists = (id, offset) =>
  `${process.env.REACT_APP_BASE_URL}/browse/categories/${id}/playlists?country=SE&offset=${offset}&limit=8`;
  