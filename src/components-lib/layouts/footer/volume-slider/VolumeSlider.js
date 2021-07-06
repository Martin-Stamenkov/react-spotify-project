import React, { useState } from "react";
import { Grid, Slider } from "@material-ui/core";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { useStyles } from "./volume-slider.styles";

export const VolumeSlider = () => {
    const [value, setValue] = useState(40);
    const classes = useStyles();

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <VolumeUp className={classes.volumeIcon} />
            </Grid>
            <Grid item xs>
                <Slider
                    className={classes.slider}
                    value={value}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                />
            </Grid>
        </Grid>
    );
};
