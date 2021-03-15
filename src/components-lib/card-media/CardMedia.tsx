import React, { MouseEventHandler } from "react";
import {
  Card,
  CardActionArea,
  CardMedia as CardMediaMU,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Button, Typography } from "components-lib";
import { Colors } from "styles";
import { truncate } from "utils";

interface ICardMedia {
  id: string;
  type?: string;
  name: string;
  description: string;
  image: string;
  withCircleAvatar?: boolean;
  withFlex?: boolean;
  path?: string;
  onClick?: MouseEventHandler<{}>;
}

const useStyles = makeStyles({
  root: {
    width: 220,
    maxHeight: 285,
    height: "100%",
    backgroundColor: "#0c0c0c",
    paddingBottom: 25,
    "& .hidden-button": {
      display: "none",
    },
    "&:hover .hidden-button": {
      display: "block",
    },
    "&:hover": {
      backgroundColor: "#181818",
    },
  },
  content: {
    color: Colors.White,
  },
});

const defaultValues = {
  withFlex: true,
  withCircleAvatar: false,
};

export function CardMedia({
  name,
  description,
  image,
  path,
  withCircleAvatar = defaultValues.withCircleAvatar,
  withFlex = defaultValues.withFlex,
  onClick,
}: ICardMedia) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Button.Link to={path}>
        <CardActionArea
          onClick={onClick}
          style={{
            display: withFlex ? "flex" : "block",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardMediaMU
            style={{
              height: 185,
              width: 190,
              borderRadius: withCircleAvatar ? 100 : 2,
              marginTop: 15,
            }}
            component="img"
            alt="Image"
            height="100"
            image={image}
            title="Image"
          />
          <CardContent>
            <Typography customStyle={{ color: Colors.White }} variant="h6">
              {truncate(name, {
                length: 15,
                separator: " ",
              })}
            </Typography>
            <Typography variant="body2" customStyle={{ color: Colors.Grey }}>
              {truncate(description, {
                length: 50,
                separator: " ",
              })}
            </Typography>
          </CardContent>
          <Button.Play className="hidden-button" withPadding />
        </CardActionArea>
      </Button.Link>
    </Card>
  );
}
