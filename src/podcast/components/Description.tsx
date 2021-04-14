import { Grid } from "@material-ui/core";
import { Typography } from "components-lib";
import React from "react";
import { Colors } from "styles";

interface IDescription {
  description: string;
}

export function Description({ description }: IDescription) {
  return (
    <Grid style={{width: 500, margin: 50}}>
      <Typography
        customStyle={{ color: Colors.White, fontWeight: 900 }}
        variant="h5"
        gutterBottom
      >
        About
      </Typography>
      <Typography
        customStyle={{ color: Colors.Grey02 }}
      >
        {description}
      </Typography>
    </Grid>
  );
}
