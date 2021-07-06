import axios from "axios";
import { addPlaylist, editPlaylist, playlistInfo, removePlaylist, followPlaylist, checkPlaylist, addTrack } from "./endpoints";
import { requestHeader } from "utils";

export const getPlaylist = async (id) => {
  const response = await axios.get(playlistInfo(id), {
    headers: requestHeader,
  });

  return response.data;
};

export const CheckIfUserFollowPlaylist = async (id, ids) => {
  const response = await axios.get(checkPlaylist(id, ids), {
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

export const FollowPlaylist = async (id) => {
  const response = await axios.put(
    followPlaylist(id),{},
    {
      headers: requestHeader,
    }
  );

  return response.data;
};

export const EditPlaylistDetails = async (id, name, description) => {
  const response = await axios.put(
    editPlaylist(id),
    {
      name: name,
      description: description,
      public: false,
    },
    {
      headers: requestHeader,
    }
  );

  return response.data;
};

export const AddTrackToPlaylist = async (id, uri) => {
  const response = await axios.post(
    addTrack(id, uri),
    {},
    {
      headers: requestHeader,
    }
  );

  return response.data;
};
