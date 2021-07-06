import React, { CSSProperties, MouseEventHandler } from "react";
import { Colors } from "styles";
import {
  ButtonBase,
  ExtendButtonBaseTypeMap,
  makeStyles,
} from "@material-ui/core";
import { OverrideProps } from "@material-ui/core/OverridableComponent";

interface IButtonPrimary {
  onClick?: MouseEventHandler<{}>;
  customStyle?: CSSProperties;
  href?: { href: string } & OverrideProps<ExtendButtonBaseTypeMap<any>, "a">;
  className?: string;
}

export const useStyles = makeStyles({
  button: {
    width: 100,
    height: 35,
    color: Colors.Black,
    borderRadius: 50,
    fontSize: 18,
    border: `1px solid ${Colors.Grey02}`,
    backgroundColor: Colors.White,
    mixBlendMode: "screen",
    "&:hover": {
      transform: "scale(1.06)"
    },
  },
});

export const ButtonPrimary: React.FC<IButtonPrimary> = ({
  children,
  customStyle,
  onClick,
  className,
  href,
}) => {
  const classes = useStyles();
  return (
    <ButtonBase
      href={href}
      style={customStyle}
      onClick={onClick}
      className={className ? className : classes.button}
    >
      {children}
    </ButtonBase>
  );
};
