import axios from "axios";
import { requestHeader } from "utils";
import { genre } from "./endpoints";

export const getGenreDetails = async (genreId: string) => {
  const response = await axios.get(genre(genreId), {
    headers: requestHeader,
  });

  return response.data;
};
