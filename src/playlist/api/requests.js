import axios from "axios";
import { addPlaylist, playlistInfo, removePlaylist } from "./endpoints";
import { requestHeader } from "utils";

export const getPlaylist = async (id) => {
  const response = await axios.get(playlistInfo(id), {
    headers: requestHeader,
  });

  return response.data;
};

export const CreatePlaylist = async (userId) => {
  const response = await axios.post(
    addPlaylist(userId),
    {
      name: "New Playlist",
      description: "New playlist description",
      public: false,
    },
    {
      headers: requestHeader,
    }
  );

  return response.data;
};

export const RemovePlaylist = async (id) => {
  const response = await axios.delete(
    removePlaylist(id),
    {
      headers: requestHeader,
    }
  );

  return response.data;
};
