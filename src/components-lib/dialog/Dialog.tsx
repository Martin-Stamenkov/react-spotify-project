import React, { MouseEventHandler } from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog as MUDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ModalProps,
} from "@material-ui/core";

interface IDialog {
  title: string;
  description: string;
  buttonTitle: string;
  open: boolean;
  handleClose?: ModalProps["onClose"];
  handleClick?: MouseEventHandler<{}>;
  handleClickCancel?: MouseEventHandler<{}>;
}

export function Dialog({
  title,
  description,
  open,
  buttonTitle,
  handleClick,
  handleClose,
  handleClickCancel,
}: IDialog) {
  return (
    <>
      <MUDialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            {buttonTitle}
          </Button>
        </DialogActions>
      </MUDialog>
    </>
  );
}
