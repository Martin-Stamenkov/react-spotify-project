export const album = (id: string) =>
    `${process.env.REACT_APP_BASE_URL}/albums/${id}`;

export const moreAlbums = (id: string) => `${process.env.REACT_APP_BASE_URL}/artists/${id}/albums?market=ES&limit=7`