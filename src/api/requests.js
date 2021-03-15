import axios from "axios";
import { categories, categoryPlaylists } from "./endpoints";
import { Storage } from "../storage";

export const getListOfCategories = async () => {
  const listCategories = await axios
    .get(categories, {
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

  return listCategories?.data?.categories;
};

export const getCategoryPlaylists = async (id) => {
  return await axios
    .get(categoryPlaylists(id), {
      headers: {
        Authorization: "Bearer " + Storage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response?.data?.playlists;
    })
    .catch((err) => {
      console.log(err);
    });
};
