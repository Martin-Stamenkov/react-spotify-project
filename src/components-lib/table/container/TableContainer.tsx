import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table as MUTable, TableBody, TableHead } from "@material-ui/core";
import { TableCell } from "../cell";
import { TableRow } from "../row";
import { Spacer } from "../../spacer";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { Colors } from "styles";

interface ITableContainer {
  withDateAdded?: boolean;
  withBottomHeight?: boolean;
  withAlbum?: boolean;
  withHeader?: boolean
}

const useStyles = makeStyles({
  table: {
    marginLeft: -10,
    backgroundColor: Colors.Black01,
  },
});

export const TableContainer: React.FC<ITableContainer> = ({
  children,
  withDateAdded,
  withBottomHeight = true,
  withAlbum = true,
  withHeader = true
}) => {
  const classes = useStyles();

  return (
    <MUTable className={classes.table}>
      {withHeader ? <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          {withAlbum ? <TableCell align="center">Album</TableCell> : null}
          {withDateAdded ? (
            <TableCell align="right">Date Added</TableCell>
          ) : null}
          <TableCell align="right">
            <QueryBuilderIcon />
          </TableCell>
        </TableRow>
      </TableHead> : null}
      <TableBody>
        {children}
        <tr>
          <td>{withBottomHeight ? <Spacer height={100} /> : null}</td>
        </tr>
      </TableBody>
    </MUTable>
  );
};
