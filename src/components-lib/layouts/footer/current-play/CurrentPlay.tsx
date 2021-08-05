import React from "react";
import { Box, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { useStyles } from "./current-play.styles";
import { Button } from "components-lib";
import { useProfile } from "user";
import { Colors } from "styles";
import { AddAndRemoveTracks } from "utils";


export const CurrentPlay = () => {
  const classes = useStyles();
  const { userCurrentPlayback } = useProfile();

  return (
    userCurrentPlayback && userCurrentPlayback.item &&
    <Grid className={classes.root}>
      <img className={classes.cover} alt="Value" src={userCurrentPlayback.item.album && userCurrentPlayback.item.album.images.length > 0
        ? userCurrentPlayback.item.album.images[0].url
        : userCurrentPlayback.item.images[0].url} />
      <Box className={classes.details}>
        <CardContent className={classes.content}>
          <Button.Link to={userCurrentPlayback.item.album
            ? `../album/${userCurrentPlayback.item.album.id}`
            : `../episode/${userCurrentPlayback.item.id}`} >
            {userCurrentPlayback.item.name}
          </Button.Link>
          <Box color={Colors.Grey}>
            {userCurrentPlayback.item.artists ? userCurrentPlayback.item.artists.map((artist: { name: string, id: string }, index: number) =>
              <Button.Link key={index} to={`/artists/${artist.id}`}>
                {artist.name}
              </Button.Link>
            ).reduce((prev: string, curr: string) => [prev, ', ', curr])
              : <Button.Link to={`/show/${userCurrentPlayback.item.show.id}`}>
                {userCurrentPlayback.item.show.name}
              </Button.Link>}
          </Box>
        </CardContent>
      </Box>
      <AddAndRemoveTracks id={userCurrentPlayback.item.id} />
    </Grid>
  );
};
