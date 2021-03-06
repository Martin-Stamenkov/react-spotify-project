import React from "react"
import { SaveTracks, RemoveTracks, GetLikedSongs } from "liked-songs"
import { useSnackbar } from "notistack";
import { useProfile } from "user";
import { Button } from "components-lib";
import { useLibraryFollowedStatus } from "hooks";

interface IAddAndRemoveTracks {
    id: string;
}

export function AddAndRemoveTracks({ id }: IAddAndRemoveTracks) {
    const { setLikedSongs } = useProfile();
    const { enqueueSnackbar } = useSnackbar();
    const isAddedToLibrary = useLibraryFollowedStatus(id)
    const saveAndRemoveTrackFromLibrary = async () => {
        if (!isAddedToLibrary) {
            await SaveTracks(id)
        } else {
            await RemoveTracks(id)
        }
        const response = await GetLikedSongs()
        setLikedSongs(response)
        enqueueSnackbar(isAddedToLibrary ? "Removed from your Library" : "Saved To Your Library", {
            variant: "info",
        });
    }

    return (
        <Button.Favorite isFavorite={isAddedToLibrary} onClick={(e) => {
            e.stopPropagation();
            saveAndRemoveTrackFromLibrary();
        }} />
    )
}
