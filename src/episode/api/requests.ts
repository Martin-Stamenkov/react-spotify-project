import axios from "axios";
import { requestHeader } from "utils";
import { episode, followOrUnfollow } from "./endpoints";

export const getEpisodeDetails = async (id: string) => {
    const response = await axios.get(episode(id), {
        headers: requestHeader,
    });

    return response.data;
};

export const followEpisode = async (id: string) => {
    const response = await axios.put(followOrUnfollow(id), {}, {
        headers: requestHeader,
    });

    return response.data;
};

export const unfollowEpisode = async (id: string) => {
    const response = await axios.delete(followOrUnfollow(id), {
        headers: requestHeader,
    });

    return response.data;
};
