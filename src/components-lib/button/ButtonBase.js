import { Button } from "@material-ui/core";
import React from "react";

export function ButtonBase({ onClick, className, children }) {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
}
