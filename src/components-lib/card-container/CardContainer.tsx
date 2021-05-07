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
          justifyContent: "space-between",
        }}
      >
        <Typography
          customStyle={{ color: Colors.White }}
          variant="h5"
          gutterBottom
        >
          {title}
        </Typography>
        {withSeeAllFlag ? (
          <Button.Link customStyle={{ marginRight: 20, fontSize: 16  }} to={path}>
            SEE ALL
          </Button.Link>
        ) : null}
      </div>
      <Spacer height={20} />
      <Grid container spacing={5}>
        {children}
      </Grid>
      <Spacer height={20} />
    </>
  );
};
