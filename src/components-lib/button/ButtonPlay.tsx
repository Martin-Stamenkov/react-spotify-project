import React, { CSSProperties } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from '@material-ui/icons/Pause';
import { Colors } from "styles";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

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
  buttonBackgroundColor?: string;
  buttonColor?: string;
}

export const useStyles = makeStyles({
  playIcon: {
    backgroundColor: Colors.MainGreen,
    borderRadius: 50,
    color: Colors.White,
    "&:hover": {
      transform: "scale(1.1)"
    },
  },
});

export function ButtonPlay({
  className = "span",
  position = "absolute",
  withPadding,
  width = 40,
  height = 40,
  buttonBackgroundColor,
  buttonColor,
  style
}: IButtonPlay) {
  const classes = useStyles();
  const [isPlayed, setIsPlayed] = useState(false)

  const iconOverrideStyle = {
    color: buttonColor,
    backgroundColor: buttonBackgroundColor,
    width: width,
    height: height,
  }

  return (
    <span
      onClick={(e) => (e.stopPropagation(), setIsPlayed(isPlayed => !isPlayed))}
      className={className}
      style={style ? style : {
        bottom: 100,
        right: 20,
        padding: withPadding ? 10 : 0,
        position: position,
      }}
    >
      {!isPlayed ? <PlayArrowIcon
        className={classes.playIcon}
        style={iconOverrideStyle}
      /> : <PauseIcon
        className={classes.playIcon}
        style={iconOverrideStyle}
      />}
    </span>
  );
}

