import React, { useState } from "react";
import { Slider } from "@material-ui/core";
import { Typography } from "components-lib";
import Box from "@material-ui/core/Box";
import { useStyles } from "./progressive-line.styles";
import { Colors } from "styles";
import { useProfile } from "user";
import { millisecondsConverter } from "utils";

export const ProgressiveLine = (props: any) => {
  const [value] = useState(0);
  const classes = useStyles();
  const { userCurrentPlayback } = useProfile()

  // const handleSliderChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    userCurrentPlayback && userCurrentPlayback.item && <Box display="flex" alignItems="center">
      <Typography customStyle={{ color: Colors.White }}>
        {millisecondsConverter(props.value)}
      </Typography>
      <Box width="100%" mr={1} ml={1}>
        <Slider
          className={classes.slider}
          value={props.value || value}
          // onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
      </Box>
      <Typography customStyle={{ color: Colors.White }}>
        {millisecondsConverter(userCurrentPlayback.item.duration_ms)}
      </Typography>
    </Box>
  );
};
