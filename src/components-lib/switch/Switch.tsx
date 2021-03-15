import React from "react";
import { makeStyles, Switch as MUSwitch } from "@material-ui/core";
import { Colors } from "styles";

interface ISwitch {
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

export const useStyles = makeStyles({
  switch: {
    "& .MuiSwitch-track": {
      backgroundColor: Colors.WD1F0000,
    },
    "& .MuiSwitch-thumb": {
      color: Colors.WD1F0000,
    },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: Colors.MainGreen,
      opacity: 1.0,
    },
  },
});

export function Switch({ checked, onChange }: ISwitch) {
  const classes = useStyles();
  return (
    <MUSwitch
      className={classes.switch}
      checked={checked}
      onChange={onChange}
    />
  );
}
