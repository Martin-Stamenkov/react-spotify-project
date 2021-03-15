import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { Colors } from "styles";

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20%",
  },
  spinner: {
    color: Colors.Grey,
  },
});

export function Spinner() {
  const classes = useStyles();
  return (
    <Grid className={classes.spinnerContainer}>
      <CircularProgress size={50} className={classes.spinner} />
    </Grid>
  );
}
