export const episode = (id: string) => `${process.env.REACT_APP_BASE_URL}/episodes/${id}?market=ES`
export const follow = (id: string) => `${process.env.REACT_APP_BASE_URL}/me/episodes?ids=${id}`