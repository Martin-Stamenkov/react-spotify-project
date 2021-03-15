import React from "react";
import { TableCell as MUTableCell } from "@material-ui/core";
import { Colors } from "styles";

interface ITableCell {
  align?: "left" | "center" | "right" | "justify" | "inherit" | undefined;
}

export const TableCell: React.FC<ITableCell> = ({ align, children }) => {
  return (
    <MUTableCell style={{ color: Colors.WD1F0000 }} align={align}>
      {children}
    </MUTableCell>
  );
};
