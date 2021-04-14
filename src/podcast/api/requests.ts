import axios from "axios";
import { requestHeader } from "utils";
import { show } from "./endpoints";

export const getShow = async (id: string) => {
  const response = await axios.get(show(id), {
    headers: requestHeader,
  });

  return response.data;
};
