import axios from "axios";
import { requestHeader } from "utils";
import { savedTracks, saveAndRemoveTrack } from "./endpoints";

export const GetLikedSongs = async () => {
  const response = await axios.get(savedTracks, {
    headers: requestHeader,
  });

  return response.data;
};

export const SaveTracks = async (id: string) => {
  const response = await axios.put(saveAndRemoveTrack(id), {}, {
    headers: requestHeader,
  });

  return response.data;
};

export const RemoveTracks = async (id: string) => {
  const response = await axios.delete(saveAndRemoveTrack(id), {
    headers: requestHeader,
  });

  return response.data;
};
