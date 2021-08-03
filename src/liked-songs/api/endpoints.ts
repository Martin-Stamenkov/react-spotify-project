export const savedTracks = `${process.env.REACT_APP_BASE_URL}/me/tracks?market=ES&limit=50`

export const saveAndRemoveTrack = (id: string) => `${process.env.REACT_APP_BASE_URL}/me/tracks?ids=${id}`

