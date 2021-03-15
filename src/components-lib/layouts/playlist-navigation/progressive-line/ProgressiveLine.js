import React, { useState } from "react";
import { Slider } from "@material-ui/core";
import { Typography } from "components-lib";
import Box from "@material-ui/core/Box";
import { useStyles } from "./progressive-line.styles";

export const ProgressiveLine = (props) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box display="flex" alignItems="center">
        {/* <Typography
                    variant="body2"
                    color="textSecondary"
                >{`${props.value}`}</Typography> */}
        <Box width="100%" mr={1}>
          <Slider
            className={classes.slider}
            value={props.value || value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />{" "}
        </Box>
        <Typography variant="body2" color="textSecondary">
          {props.value}
        </Typography>
      </Box>
    </>
  );
};
