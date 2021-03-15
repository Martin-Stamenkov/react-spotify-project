import React, { CSSProperties } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Colors } from "styles";
import { makeStyles } from "@material-ui/core";

interface IButtonPlay {
  className?: string;
  style?: CSSProperties;
  withPadding?: boolean;
  position?:
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
  width?: number;
  height?: number;
}

export const useStyles = makeStyles({
  playIcon: {
    backgroundColor: Colors.MainGreen,
    borderRadius: 50,
    color: Colors.White,
  },
});

export function ButtonPlay({
  className = "span",
  position = "absolute",
  withPadding,
  width = 40,
  height = 40,
}: IButtonPlay) {
  const classes = useStyles();
  return (
    <span
      className={className}
      style={{
        bottom: 100,
        right: 20,
        padding: withPadding ? 10 : 0,
        position: position,
      }}
    >
      <PlayArrowIcon
        className={classes.playIcon}
        style={{
          width: width,
          height: height,
        }}
      />
    </span>
  );
}
