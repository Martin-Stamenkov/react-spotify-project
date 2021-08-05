import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { About, Button, Spacer, Spinner, Typography } from "components-lib";
import { Colors } from "styles";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { getEpisodeDetails, followEpisode, unfollowEpisode } from "./api";
import { useSnackbar } from "notistack";
import { getUserEpisodes, useProfile } from "user";
import { useLibraryFollowedStatus } from "hooks";

export const EpisodeDetails = () => {
    const { id }: { id: string } = useParams();
    const { data, status } = useQuery("episode", async () => await getEpisodeDetails(id));
    const checkIfEpisodeIsFollowed = useLibraryFollowedStatus(id);
    const { setLikedEpisodes } = useProfile()
    const { enqueueSnackbar } = useSnackbar();
    const [isFollowed, setIsFollowed] = useState(checkIfEpisodeIsFollowed);

    const handleFollowEpisode = async () => {
        if (!isFollowed) {
            await followEpisode(id)
        } else {
            await unfollowEpisode(id)
        }
        const response = await getUserEpisodes();
        setLikedEpisodes(response)
        setIsFollowed(response.items.some((item: { episode: { id: string; }; }) => item.episode.id === id))

        enqueueSnackbar(
            !isFollowed ? "Saved to your library" : "Removed from your library",
            { variant: "info" }
        );
    }

    return (
        <>
            {status === "loading" ? (
                <Spinner />
            ) : (
                <>
                    <About
                        type="podcast episode"
                        name={data.name}
                        description={data.show.name}
                        avatarBorderRadius={{ borderRadius: 10 }}
                        avatar={data.images[0].url}
                        additionalInfo={`${format(parseISO(data.release_date), "LLL dd")}\n\u2022 ${Math.round(data.duration_ms / 60000)} min`}
                    />
                    <Grid style={{ width: 500, margin: 10 }}>
                        <Box display="flex" alignItems="center">
                            <Button.Play position={"inherit"} width={60} height={60} />
                            <Spacer width={20} />
                            <Button.Favorite
                                isFavorite={checkIfEpisodeIsFollowed}
                                onClick={handleFollowEpisode}
                                width={40}
                                height={40}
                            />
                        </Box>
                        <Spacer height={30} />
                        <Typography
                            customStyle={{ color: Colors.White, fontWeight: 900 }}
                            variant="h5"
                            gutterBottom
                        >
                            Episode Description
                        </Typography>
                        <Typography
                            customStyle={{ color: Colors.Grey02 }}
                        >
                            {data.description}
                        </Typography>
                    </Grid>
                </>
            )}
            <Spacer height={120} />
        </>
    );
};
