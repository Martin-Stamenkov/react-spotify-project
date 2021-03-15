import React from "react";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { useStyles } from "./profile-menu.styles";
import { useHistory } from "react-router-dom";
import { Storage } from "storage";

export const ProfileMenu = ({ props, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();

  const logOut = () => {
    Storage.removeItem("accessToken");
    document.location.href = "/";
  };

  const onProfilePressHandler = () => {
    history.push("/profile");
    handleClose();
  };

  return (
    <>
      <Menu
        style={{ top: 45 }}
        id="customized-menu"
        className={classes.menu}
        anchorEl={props}
        open={Boolean(props)}
        onClose={handleClose}
      >
        <MenuItem onClick={onProfilePressHandler}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>Log out</MenuItem>
      </Menu>
    </>
  );
};
