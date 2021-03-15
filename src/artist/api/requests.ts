import axios from "axios";
import {
  artist,
  artistDiscography,
  relatedArtist,
  artistsTopTracks,
  follow
} from "./endpoints";
import { Storage } from "storage";
import { requestHeader } from "utils";

export const getArtist = async (id: string) => {
  return await axios
    .get(artist(id), {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArtistAlbums = async (id: string, limit: number) => {
  return await axios
    .get(artistDiscography(id, limit), {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRelatedArtists = async (id: string) => {
  return await axios
    .get(relatedArtist(id), {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArtistsTopTracks = async (id: string) => {
  return await axios
    .get(artistsTopTracks(id), {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const followArtist = async (id: string) => {

  const response = await axios.put(follow(id), {}, { headers: requestHeader })

  console.log(response)

  return response.data
}
