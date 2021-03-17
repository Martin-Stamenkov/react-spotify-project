import axios from "axios";
import { categories, categoryPlaylists } from "./endpoints";
import { Storage } from "../storage";

export const getListOfCategories = async (limit) => {
  const listCategories = await axios
    .get(categories(limit), {
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

export const getCategoryPlaylists = async (id, offset) => {
  return await axios
    .get(categoryPlaylists(id, offset), {
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
