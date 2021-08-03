import React from "react"
import { SaveTracks, RemoveTracks, GetLikedSongs } from "liked-songs"
import { useSnackbar } from "notistack";
import { useProfile } from "user";
import { Button } from "components-lib";

interface IAddAndRemoveTracks {
    id: string;
    isAdded: boolean;
}

export function AddAndRemoveTracks({ id, isAdded }: IAddAndRemoveTracks) {
    const { setLikedSongs } = useProfile();
    const { enqueueSnackbar } = useSnackbar();

    const saveAndRemoveTrackFromLibrary = async () => {
        if (!isAdded) {
            await SaveTracks(id)
        } else {
            await RemoveTracks(id)
        }
        const response = await GetLikedSongs()
        setLikedSongs(response)
        enqueueSnackbar(isAdded ? "Removed from your Library" : "Saved To Your Library", {
            variant: "info",
        });
    }

    return (
        <Button.Favorite isFavorite={isAdded} onClick={() => saveAndRemoveTrackFromLibrary()} />
    )
}
