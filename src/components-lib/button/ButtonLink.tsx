import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "styles";

interface IButtonLink {
  to: any;
  customStyle?: CSSProperties;
}

export const useStyles = makeStyles({
  link: {
    color: Colors.Grey02,
    fontSize: 14,
    textDecoration: "none",
    "&:hover": {
      color: Colors.WD1F0000,
      // textDecoration: "underline",
    },
  },
});

export const ButtonLink: React.FC<IButtonLink> = ({
  to,
  children,
  customStyle,
}) => {
  const classes = useStyles();
  return (
    <Link  to={to} style={customStyle} className={classes.link}>
      {children}
    </Link>
  );
};
