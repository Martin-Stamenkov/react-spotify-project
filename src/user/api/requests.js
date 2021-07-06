import axios from "axios";
import {
  user,
  followedArtists,
  userPlaylists,
  userAlbums,
  userPodcasts,
  checkUserArtists,
  userCurrentTrack,
  userEpisodes
} from "./endpoints";
import { requestHeader } from "utils";

export const getUserAccount = async () => {
  const response = await axios.get(user, {
    headers: requestHeader,
  });

  return response.data;
};

export const getUserFollowedArtists = async () => {
  const response = await axios.get(followedArtists, {
    headers: requestHeader,
  });

  return response.data.artists;
};

export const getListOfCurrentUserPlaylists = async () => {
  const response = await axios.get(userPlaylists, {
    headers: requestHeader,
  });
  return response.data;
};

export const getCurrentUserSavedAlbums = async () => {
  const response = await axios.get(userAlbums, {
    headers: requestHeader,
  });
  return response.data;
};

export const getCurrentUserSavedShows = async () => {
  const response = await axios.get(userPodcasts, {
    headers: requestHeader,
  });
  return response.data;
};

export const checkIfUserFollowArtist = async (id) => {
  const response = await axios.get(checkUserArtists(id), {
    headers: requestHeader,
  });

  return response.data[0];
};

export const getTheUserCurrentlyPlayingTrack = async () => {
  const response = await axios.get(userCurrentTrack, {
    headers: requestHeader,
  });

  return response.data;
};

export const getUserEpisodes = async () => {
  const response = await axios.get(userEpisodes, {
    headers: requestHeader,
  });

  return response.data;
};
