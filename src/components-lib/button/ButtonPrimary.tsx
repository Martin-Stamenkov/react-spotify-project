import React, { CSSProperties, MouseEventHandler } from "react";
import { Colors } from "styles";
import { ButtonBase, makeStyles } from "@material-ui/core";

interface IButtonPrimary {
  onClick?: MouseEventHandler<{}>;
  customStyle?: CSSProperties
}

export const useStyles = makeStyles({
  button: {
    width: 100,
    height: 35,
    color: Colors.WD1F0000,
    borderRadius: 5,
    fontSize: 18,
    border: `1px solid ${Colors.Grey02}`,
    "&:hover": {
      borderColor: Colors.White,
    },
  },
});

export const ButtonPrimary: React.FC<IButtonPrimary> = ({
  children,
  customStyle,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <ButtonBase style={customStyle} onClick={onClick} className={classes.button}>
      {children}
    </ButtonBase>
  );
};
