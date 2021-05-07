import axios from "axios";
import { categories, categoryPlaylists, search } from "./endpoints";
import { requestHeader } from "utils";

export const getListOfCategories = async (limit) => {
  const listCategories = await axios
    .get(categories(limit), {
      headers: requestHeader,
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
      headers: requestHeader,
    })
    .then((response) => {
      return response?.data?.playlists;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getResultFromSearch = async (query) => {
  const response = await axios.get(search(query), { headers: requestHeader });

  return response.data;
};
