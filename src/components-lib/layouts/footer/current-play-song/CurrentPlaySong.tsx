import React from "react";
import { Box, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import avatar from "assets/music_placeholder.png";
import { useStyles } from "./current-play-song.styles";
import { Button } from "components-lib";
import { useProfile } from "user";
import { Colors } from "styles";

export const PlayListContent = () => {
  const classes = useStyles();
  const { userCurrentTrack } = useProfile()

  return (
    userCurrentTrack &&
    <Grid className={classes.root}>
      <img className={classes.cover} alt="Value" src={userCurrentTrack.item.album.images.length > 0 ? userCurrentTrack.item.album.images[0].url : avatar} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Button.Link to={`../album/${userCurrentTrack.item.album.id}`} >
            {userCurrentTrack.item.name}
          </Button.Link>
          <Box color={Colors.Grey}>
            {userCurrentTrack.item.artists.map((artist: { name: string, id: string }, index: number) =>
              <Button.Link key={index} to={`/artists/${artist.id}`}>
                {artist.name}
              </Button.Link>
            ).reduce((prev: string, curr: string) => [prev, ', ', curr])}
          </Box>
        </CardContent>
      </div>
      <Button.Favorite />
    </Grid>
  );
};
