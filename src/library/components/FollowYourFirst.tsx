import { Grid, makeStyles } from "@material-ui/core";
import { Typography, Spacer } from "components-lib";
import { CreatePlaylist } from "playlist";
import React from "react";
import { useHistory } from "react-router";
import { Colors } from "styles";
import { useProfile } from "user";
import { FindButton } from "./FindButton";

interface IFollowYourFirst {
  title: string;
  description: string;
  buttonTitle: string;
}

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 34,
    color: Colors.White,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20%",
  },
}));

export function FollowYourFirst({
  title,
  description,
  buttonTitle,
}: IFollowYourFirst) {
  const classes = useStyles();
  const history = useHistory();
  const { profile } = useProfile();


  const handleClick = async () => {
    if(!title.includes('playlist')) {
      history.push("/search")
    } else {
      const playlist = await CreatePlaylist(profile.id)
      history.push(`/playlist/${playlist.id}`)
    }
  }

  return (
    <Grid className={classes.infoContainer}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography
        customStyle={{ fontSize: 16 }}
        className={classes.title}
      >
        {description}
      </Typography>
      <Spacer height={20} />
      <FindButton onClick={handleClick}>
        {buttonTitle}
      </FindButton>
    </Grid>
  );
}
