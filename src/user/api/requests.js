import axios from "axios";
import { getUser, getFollowedArtists } from "./endpoints";
import { Storage } from "storage";

export const getUserAccount = async () => {
  const user = await axios
    .get(getUser, {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return user?.data;
};

export const getUserFollowedArtists = async () => {
  const artists = await axios
    .get(getFollowedArtists, {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });

  return artists?.data?.artists;
};
