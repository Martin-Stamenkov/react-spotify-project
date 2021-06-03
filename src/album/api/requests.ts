import axios from "axios";
import { album, moreAlbums } from "./endpoints";
import { requestHeader } from "utils";

export const getAlbum = async (id: string) => {

    const response = await axios
        .get(album(id), {
            headers: requestHeader
        })

    return response.data
};
export const getMoreAlbums = async (id: string) => {
    const response = await axios
        .get(moreAlbums(id), {
            headers: requestHeader
        })

    return response.data
};
