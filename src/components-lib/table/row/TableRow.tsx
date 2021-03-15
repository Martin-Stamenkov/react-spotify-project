import React from "react";
import { TableRow as MUTableRow } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core";
import { Colors } from "styles";

interface ITableRow {
  hover?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    rowHover: {
      "&:hover": {
        backgroundColor: `${Colors.Grey01} !important`,
      },
    },
  })
);

export const TableRow: React.FC<ITableRow> = ({ hover, children }) => {
  const classes = useStyles();

  return (
    <MUTableRow classes={{ hover: classes.rowHover }} hover={hover}>
      {children}
    </MUTableRow>
  );
};
