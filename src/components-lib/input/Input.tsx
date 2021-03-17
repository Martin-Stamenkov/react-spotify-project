import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Colors } from "styles";
const useStyles = makeStyles({
  input: {
    backgroundColor: Colors.White,
    borderRadius: 50,
    width: '40%',
    '& .MuiOutlinedInput-root': {
        borderRadius: 50,
        height: 40
    }
  },
});

export function Input() {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={classes.input}
        id="input"
        placeholder="Placeholder"
        margin="normal"
        variant="outlined"
      />
    </>
  );
}
