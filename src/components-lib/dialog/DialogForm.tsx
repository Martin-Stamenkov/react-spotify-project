import React, { MouseEventHandler } from "react";
import {
  Dialog as MUDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  ModalProps,
} from "@material-ui/core";
import { Input } from "../input";
import { Button, Typography } from "components-lib";
import { Colors } from "styles";

interface IDialogForm {
  title: string;
  description?: string;
  buttonTitle: string;
  open: boolean;
  src?: string;
  handleClose?: ModalProps["onClose"];
  handleClick?: MouseEventHandler<{}>;
  handleClickCancel?: MouseEventHandler<{}>;
  playlistDescription?: string;
  playlistTitle?: string;
}

export const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  textColor: {
    color: Colors.White,
  },
}));

export function DialogForm({
  title,
  description,
  open,
  buttonTitle,
  handleClick,
  handleClose,
  handleClickCancel,
  playlistDescription,
  playlistTitle,
  src,
}: IDialogForm) {
  const classes = useStyles();

  return (
    <>
      <MUDialog open={open} onClose={handleClose}>
        <Grid style={{ backgroundColor: Colors.Grey03, width: 500 }}>
          <DialogTitle style={{ color: Colors.White }}>{title}</DialogTitle>
          <DialogContent className={classes.content}>
            {description ? (
              <DialogContentText>{description}</DialogContentText>
            ) : null}
            <img
              style={{ marginRight: 30 }}
              width={185}
              alt="Playlist Avatar"
              src={src}
            />
            <Grid className={classes.inputsContainer}>
              <Input
                inputProps={{
                  className: classes.textColor,
                }}
                defaultValue={playlistTitle}
              />
              <Input
                inputProps={{
                  className: classes.textColor,
                }}
                multiline
                defaultValue={playlistDescription}
                rows={4}
              />
            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: 22 }}>
            <Button.Primary onClick={handleClickCancel}>Cancel</Button.Primary>
            <Button.Primary onClick={handleClick}>{buttonTitle}</Button.Primary>
          </DialogActions>
          <Typography
            customStyle={{
              fontSize: 12,
              color: Colors.White,
              margin: 10,
              marginLeft: 22,
            }}
          >
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image
          </Typography>
        </Grid>
      </MUDialog>
    </>
  );
}
