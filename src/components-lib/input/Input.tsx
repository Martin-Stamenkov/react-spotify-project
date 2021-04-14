import { OutlinedInputProps, TextField } from "@material-ui/core";
import React from "react";

interface IInput {
  id?: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  rows?: string | number;
  defaultValue?: unknown;
  inputProps?: OutlinedInputProps['inputProps'];
}

export function Input({
  id,
  className,
  multiline,
  placeholder,
  rows,
  defaultValue,
  inputProps
}: IInput) {
  return (
    <>
      <TextField
        defaultValue={defaultValue}
        multiline={multiline}
        className={className}
        rows={rows}
        id={id}
        placeholder={placeholder}
        margin="normal"
        variant="outlined"
        inputProps={inputProps}
      />
    </>
  );
}
