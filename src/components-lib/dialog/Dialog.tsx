import React, { MouseEventHandler } from "react";
import {
  Dialog as MUDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  ModalProps,
} from "@material-ui/core";
import { Button } from "components-lib";
import { Colors } from "styles";

interface IDialog {
  title: string;
  description: string;
  buttonTitle: string;
  open: boolean;
  handleClose?: ModalProps["onClose"];
  handleClick?: MouseEventHandler<{}>;
  handleClickCancel?: MouseEventHandler<{}>;
}


export const useStyles = makeStyles({
  button: {
    width: 100,
    height: 35,
    color: Colors.Grey,
    borderRadius: 5,
    fontSize: 18,
    "&:hover": {
      // height:  40,
      width: 110,

    },
  },
  forwardButton: {
    width: 100,
    height: 35,
    color: Colors.White,
    backgroundColor: Colors.MainGreen,
    borderRadius: 50,
    fontSize: 18,
    // border: `1px solid ${Colors.Grey02}`,
    "&:hover": {
      // height:  40,
      width: 110,

    },
  }

});

export function Dialog({
  title,
  description,
  open,
  buttonTitle,
  handleClick,
  handleClose,
  handleClickCancel,
}: IDialog) {
  const classes = useStyles()

  return (
    <>
      <MUDialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button.Primary className={classes.button} onClick={handleClickCancel}>
            Cancel
          </Button.Primary>
          <Button.Primary className={classes.forwardButton} onClick={handleClick} >
            {buttonTitle}
          </Button.Primary>
        </DialogActions>
      </MUDialog>
    </>
  );
}
