import React, { MouseEventHandler } from "react";
import { TableRow as MUTableRow } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core";
import { Colors } from "styles";

interface ITableRow {
  hover?: boolean;
  onClick?: MouseEventHandler<{}>;
  onMouseEnter?: MouseEventHandler<{}>;
  onMouseLeave?: MouseEventHandler<{}>;
  className?: string;

}

const useStyles = makeStyles(() =>
  createStyles({
    rowHover: {
      "&:hover": {
        backgroundColor: `${Colors.Grey01} !important`,
        cursor: "pointer"
      },
    },
  })
);

export const TableRow: React.FC<ITableRow> = ({ hover, children, onClick, onMouseEnter, onMouseLeave, className }) => {
  const classes = useStyles();

  return (
    <MUTableRow className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} classes={{ hover: classes.rowHover }} hover={hover}>
      {children}
    </MUTableRow>
  );
};
