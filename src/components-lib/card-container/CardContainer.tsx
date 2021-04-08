import React from "react";
import { Grid } from "@material-ui/core";
import { Typography, Spacer, Button } from "components-lib";
import { Colors } from "styles";

interface ICardContainer {
  title: string;
  withSeeAllFlag?: boolean;
  path?: string;
}

export const CardContainer: React.FC<ICardContainer> = ({
  title,
  children,
  withSeeAllFlag,
  path,
}) => {
  return (
    <>
      <Spacer height={20} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          customStyle={{ color: Colors.White }}
          variant="h5"
          gutterBottom
        >
          {title}
        </Typography>
        {withSeeAllFlag ? <Button.Link to={path}>see all</Button.Link> : null}
      </div>
      <Spacer height={20} />
      <Grid container spacing={3}>
        {children}
      </Grid>
      <Spacer height={20} />
    </>
  );
};
