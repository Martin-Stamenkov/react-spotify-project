export const categories = (limit) => `${process.env.REACT_APP_BASE_URL}/browse/categories?offset=0&limit=${limit}`;
export const categoryPlaylists = (id, offset) =>
  `${process.env.REACT_APP_BASE_URL}/browse/categories/${id}/playlists?country=SE&offset=${offset}&limit=8`;
export const search = (query, limit, offset) =>
  `${process.env.REACT_APP_BASE_URL}/search?q=${query}&type=track%2Cartist&market=US&limit=10&offset=5`;
