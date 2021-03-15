import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button as MButton,
  useScrollTrigger,
} from "@material-ui/core";
import { useStyles } from "./header.styled";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import avatar from "assets/avatar.png";
import { ProfileMenu } from "./profile-menu";
import { Button, Typography } from "components-lib";
import { useProfile } from "user";
import { Storage } from "storage";
import { login } from "auth";
import { useHistory } from "react-router-dom";

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";
const accessToken = Storage.getItem("accessToken");

export const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile } = useProfile();
  const history = useHistory();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const navigateBack = () => {
  //   history.goBack();
  // };

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      // setAccessToken(_token);
      Storage.setItem("accessToken", _token);
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        className={`${classes.appBar} ${
          trigger === false ? "" : classes.appBarScrolled
        }`}
        position="fixed"
      >
        <Toolbar>
          <div className={classes.navigationButtons}>
            <Button.Icon onClick={() => history.goBack()}>
              <NavigateBeforeIcon />
            </Button.Icon>
            <Button.Icon onClick={() => history.goForward()}>
              <NavigateNextIcon />
            </Button.Icon>
          </div>
          {!profile && accessToken === null ? (
            <MButton className="btn btn--loginApp-link" href={login}>
              <Typography color="primary">Login In</Typography>
            </MButton>
          ) : (
            profile && (
              <MButton className={classes.chip} onClick={handleClick}>
                <>
                  <img
                    style={{ marginLeft: -5 }}
                    src={profile.images.length ? profile.images[0].url : avatar}
                    alt="Avatar"
                  />

                  <p style={{ color: "grey", marginLeft: 10 }}>
                    {profile.display_name}
                  </p>
                </>
                {!anchorEl ? (
                  <ExpandMoreIcon color="primary" />
                ) : (
                  <ExpandLessIcon color="primary" />
                )}
              </MButton>
            )
          )}
          <ProfileMenu props={anchorEl} handleClose={handleClose} />
        </Toolbar>
      </AppBar>
    </div>
  );
};