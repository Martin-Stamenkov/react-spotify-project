import React, { useState } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { Button, Typography } from "components-lib";
import { Colors } from "styles";

export const useStyles = makeStyles({
    root: {
        alignItems: "center",
        position: "fixed",
        backgroundColor: "#282828",
        left: 0,
        bottom: 0,
        padding: "20px 20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        zIndex: 1,
        backgroundImage: "linear-gradient(to right, #af2896, #509bf5)"

    },
});


export const GuestUserFooter = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Box marginLeft={5}>
                <Typography customStyle={{ color: Colors.White }}>Preview OF SPOTIFY</Typography>
                <Typography customStyle={{ color: Colors.White }}>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</Typography>
            </Box>
            <Button.Primary href="https://www.spotify.com/us/signup/?forward_url=https%3A%2F%2Fopen.spotify.com%2F">SIGN UP</Button.Primary>
        </Grid>
    );
};
