import React from "react";
import { Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import avatar from "../../../../assets/music_placeholder.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import { useStyles } from "./play-list-content.styles";

export const PlayListContent = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <img className={classes.cover} alt="Value" src={avatar} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Link to="" style={{ fontSize: 17, color: "#ffffff" }}>
            Live From Space
          </Link>
          <Link to="">Mac Miller</Link>
        </CardContent>
      </div>
      <Link to="" className={classes.favoriteIcon}>
        <FavoriteBorderIcon />
      </Link>
    </Grid>
  );
};
