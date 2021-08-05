import { useEffect, useState, useMemo } from "react";
import { useProfile } from "user";

export const useLibraryFollowedStatus = (id: string) => {
    const { userSavedTracks, userSavedEpisodes } = useProfile();
    const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);

    const checkIsAdded = useMemo(
        () =>
            (userSavedEpisodes &&
                userSavedEpisodes.items.some((item: { episode: { id: string; }; }) => item.episode.id === id)) ||
            (userSavedTracks &&
                userSavedTracks.items.some((item: { track: { id: string; }; }) => item.track.id === id)),
        [id, userSavedTracks, userSavedEpisodes]
    );

    useEffect(() => {
        setIsAddedToLibrary(checkIsAdded)
    }, [checkIsAdded])

    return isAddedToLibrary
};
