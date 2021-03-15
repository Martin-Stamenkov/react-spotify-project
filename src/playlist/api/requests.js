import axios from "axios";
import { playlistInfo } from "./endpoints";
import { Storage } from "storage";

export const getPlaylist = async (id) => {
  return await axios
    .get(playlistInfo(id), {
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
