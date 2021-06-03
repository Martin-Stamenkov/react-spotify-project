export const artist = (id: string) =>
  `${process.env.REACT_APP_BASE_URL}/artists/${id}`;

export const artistDiscography = (id: string, limit: number) =>
  `${process.env.REACT_APP_BASE_URL}/artists/${id}/albums?market=ES&limit=${limit}`;

export const relatedArtist = (id: string) =>
  `${process.env.REACT_APP_BASE_URL}/artists/${id}/related-artists`;

export const artistsTopTracks = (id: string) =>
  `${process.env.REACT_APP_BASE_URL}/artists/${id}/top-tracks?market=ES`;

export const follow = (id: string) =>
  `${process.env.REACT_APP_BASE_URL}/me/following?type=artist&ids=${id}`;
  
export const unfollow = (id: string) =>
  `${process.env.REACT_APP_BASE_URL}/me/following?type=artist&ids=${id}`;
