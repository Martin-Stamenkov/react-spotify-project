import React, { useMemo } from "react";
import { Box, Grid } from "@material-ui/core";
import { About, Button, Spacer, Spinner, Typography } from "components-lib";
import { useProfile } from "user";
import { Colors } from "styles";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { getEpisodeDetails } from "./api";
import { followEpisode } from "./api/requests";



export const Episode = () => {
    const { userEpisodes } = useProfile()
    const { id }: { id: string } = useParams();

    const { data, status } = useQuery("episode", async () => await getEpisodeDetails(id));
    const isFollowed = useMemo(
        () =>
            userEpisodes &&
            userEpisodes.items.some((item: any) => item.episode.id === id),
        [userEpisodes, id]

    ); const handleFollowEpisode = async () => {
        await followEpisode(id)
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
                                isFavorite={isFollowed}
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
        </>
    );
};
