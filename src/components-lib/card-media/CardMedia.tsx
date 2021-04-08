import React, { MouseEventHandler } from "react";
import {
  Card,
  CardActionArea,
  CardMedia as CardMediaMU,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Button, Typography, Spacer } from "components-lib";
import { Colors } from "styles";
import { truncate } from "utils";

interface ICardMedia {
  id?: string;
  type?: string;
  name?: string;
  description?: string | string[];
  image: string;
  withCircleAvatar?: boolean;
  withFlex?: boolean;
  withPlayButton?: boolean;
  path?: string;
  onClick?: MouseEventHandler<{}>;
  height?: number;
  width?: number;
  imageMarginTop?: number;
  titlePosition?:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "fixed"
    | "-webkit-sticky"
    | "absolute"
    | "relative"
    | "static"
    | "sticky"
    | undefined;
}

const useStyles = makeStyles({
  root: {
    width: 200,
    maxHeight: 300,
    backgroundColor: "#0c0c0c",
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
  withPlayButton: true,
  imageMarginTop: 15,
};

export function CardMedia({
  name,
  description,
  image,
  path,
  withCircleAvatar = defaultValues.withCircleAvatar,
  withFlex = defaultValues.withFlex,
  withPlayButton = defaultValues.withPlayButton,
  height,
  width,
  imageMarginTop = defaultValues.imageMarginTop,
  titlePosition = "inherit",
  onClick,
}: ICardMedia) {
  const classes = useStyles();

  return (
    <Card style={{ height: height, width: width }} className={classes.root}>
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
              height: 175,
              width: 170,
              borderRadius: withCircleAvatar ? 100 : 2,
              marginTop: imageMarginTop,
            }}
            component="img"
            alt="Image"
            image={image}
            title="Image"
          />
          <CardContent>
            <Typography
              customStyle={{
                color: Colors.White,
                top: 5,
                position: titlePosition,
              }}
              variant="h6"
            >
              {truncate(name, {
                length: 15,
                separator: " ",
              })}
            </Typography>
            <Typography variant="body2" customStyle={{ color: Colors.Grey }}>
              {truncate(description, {
                length: 45,
                separator: " ",
              })}
            </Typography>
          </CardContent>

          {withPlayButton ? (
            <Button.Play className="hidden-button" withPadding />
          ) : null}
        </CardActionArea>
        <Spacer height={150} />
      </Button.Link>
    </Card>
  );
}
