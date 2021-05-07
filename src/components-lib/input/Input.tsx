import React from "react";
import { OutlinedInputProps, TextField } from "@material-ui/core";

interface IInput {
  id?: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  rows?: string | number;
  defaultValue?: unknown;
  inputProps?: OutlinedInputProps["inputProps"];
  value?: unknown;
  onChange?: OutlinedInputProps["onChange"];
  name?: string;
}

export function Input({
  id,
  className,
  multiline,
  placeholder,
  rows,
  defaultValue,
  inputProps,
  value,
  onChange,
  name,
}: IInput) {
  return (
    <>
      <TextField
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        multiline={multiline}
        className={className}
        rows={rows}
        id={id}
        placeholder={placeholder}
        margin="normal"
        variant="outlined"
        inputProps={inputProps}
        name={name}
      />
    </>
  );
}
