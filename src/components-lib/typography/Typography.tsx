import React from "react";
import { PropTypes, Typography as MUTypography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

interface ITypography {
  className?: string;
  variant?: Variant | "inherit";
  color?:
    | "initial"
    | "inherit"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
  customStyle?: React.CSSProperties;
  gutterBottom?: boolean;
  align?: PropTypes.Alignment;
}

export const Typography: React.FC<ITypography> = ({
  className,
  variant,
  color,
  children,
  customStyle,
  gutterBottom,
  align,
}) => {
  return (
    <MUTypography
      className={className}
      variant={variant}
      color={color}
      style={customStyle}
      gutterBottom={gutterBottom}
      align={align}
    >
      {children}
    </MUTypography>
  );
};
