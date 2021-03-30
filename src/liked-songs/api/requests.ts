import axios from "axios";
import { requestHeader } from "utils";
import { savedTracks } from "./endpoints";

export const getLikedSongs = async () => {
  const response = await axios.get(savedTracks, {
    headers: requestHeader,
  });

  return response.data;
};
