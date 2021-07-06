import React, { useEffect, useState } from "react";
import { Grid, Box } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { useStyles } from "./footer.styles";
import { ProgressiveLine } from "./progressive-line/ProgressiveLine";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import LoopIcon from "@material-ui/icons/Loop";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { VolumeSlider } from "./volume-slider/VolumeSlider";
import { PlayListContent } from "./current-play-song/CurrentPlaySong";
import { Button } from "components-lib";
import { getTheUserCurrentlyPlayingTrack, useProfile } from "user";
import { useInterval } from "hooks";

export const Footer = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(10);
  const [response, setResponse] = useState();
  const { userCurrentTrack } = useProfile();

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 10 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // useEffect(() => {
  //   async function GetProgress() {
  //     const response = await getTheUserCurrentlyPlayingTrack()
  //   }
  //   GetProgress()
  // }, []);
  // console.log(userCurrentTrack && userCurrentTrack.progress_ms)
  // useInterval(async () => {
  //   const response = await getTheUserCurrentlyPlayingTrack()
  //   setProgress(response.progress_ms)
  //   console.log(response)
  //   if (!response.is_playing) {
  //     return
  //   }
  // }, 1000)

  return (
    <Grid container className={classes.playlistNavigation}>
      <Grid>
        <PlayListContent />
      </Grid>
      <div className={classes.playContainer}>
        <div className={classes.buttonsContainer}>
          <Button.Icon>
            <ShuffleIcon className={classes.smallIcon} />
          </Button.Icon>
          <Button.Icon>
            <SkipPreviousIcon className={classes.smallIcon} />
          </Button.Icon>
          <Button.Icon>
            <PlayCircleFilledIcon className={classes.playIcon} />
          </Button.Icon>
          <Button.Icon>
            <SkipNextIcon className={classes.smallIcon} />
          </Button.Icon>
          <Button.Icon>
            <LoopIcon className={classes.smallIcon} />
          </Button.Icon>
        </div>
        <Box width="100%" mr={1}>
          <ProgressiveLine value={progress} className={classes.progressive} />
        </Box>
      </div>
      <Grid>
        <VolumeSlider />
      </Grid>
    </Grid>
  );
};
