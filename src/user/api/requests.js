import axios from "axios";
import { user, followedArtists, userPlaylists } from "./endpoints";
import { requestHeader } from "utils";

export const getUserAccount = async () => {
  const response = await axios
    .get(user, {
      headers: requestHeader
    })

  return response.data;
};

export const getUserFollowedArtists = async () => {
  const response = await axios
    .get(followedArtists, {
      headers: requestHeader
    })

  return response.data.artists;
};
export const getListOfCurrentUserPlaylists = async () => {
  const response = await axios.get(userPlaylists, {
    headers: requestHeader
  })
  return response.data
};
