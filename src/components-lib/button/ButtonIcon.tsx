import { IconButton } from "@material-ui/core";
import React, { MouseEventHandler } from "react";

interface IButtonIcon {
  disabled?: boolean;
  className?: string;
  customStyle?: React.CSSProperties;
  onClick?: MouseEventHandler;
  children?: any;
}

export function ButtonIcon({
  children,
  customStyle,
  className,
  onClick,
  disabled,
}: IButtonIcon) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={customStyle}
    >
      {children}
    </IconButton>
  );
}
