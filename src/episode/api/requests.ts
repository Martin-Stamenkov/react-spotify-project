import axios from "axios";
import { requestHeader } from "utils";
import { episode, follow } from "./endpoints";

export const getEpisodeDetails = async (id: string) => {
    const response = await axios.get(episode(id), {
        headers: requestHeader,
    });

    return response.data;
};

export const followEpisode = async (id: string) => {
    const response = await axios.put(follow(id), {}, {
        headers: requestHeader,
    });

    return response.data;
};
