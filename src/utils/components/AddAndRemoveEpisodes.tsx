import React from "react"
import { useSnackbar } from "notistack";
import { getUserEpisodes, useProfile } from "user";
import { Button } from "components-lib";
import { useLibraryFollowedStatus } from "hooks";
import { followEpisode, unfollowEpisode } from "episode";

interface IAddAndRemoveEpisodes {
    id: string;
}

export function AddAndRemoveEpisodes({ id }: IAddAndRemoveEpisodes) {
    const { setLikedEpisodes } = useProfile();
    const { enqueueSnackbar } = useSnackbar();
    const isAddedToLibrary = useLibraryFollowedStatus(id)
    const saveAndRemoveEpisodeFromLibrary = async () => {
        if (!isAddedToLibrary) {
            await followEpisode(id)
        } else {
            await unfollowEpisode(id)
        }
        const response = await getUserEpisodes()
        setLikedEpisodes(response)
        enqueueSnackbar(isAddedToLibrary ? "Removed from your Library" : "Saved To Your Library", {
            variant: "info",
        });
    }

    return (
        <Button.Favorite isFavorite={isAddedToLibrary} onClick={(e) => {
            e.stopPropagation();
            saveAndRemoveEpisodeFromLibrary();
        }} />
    )
}
