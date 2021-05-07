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
import { Button, Input } from "components-lib";
import { useProfile } from "user";
import { Storage } from "storage";
import { login } from "auth";
import { useHistory, withRouter } from "react-router-dom";
import { Library } from "library";
import { useSearch } from "screens/search/provider/SearchProvider";

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

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile } = useProfile();
  const history = useHistory();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const { searchForAnItem, setResult } = useSearch();

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      Storage.setItem("accessToken", _token);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSearchItem = (event) => {
    const value = event.target.value

    searchForAnItem(value)
    if (value === "") {
      setResult(null)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        className={`${classes.appBar} ${
          trigger === false ? "" : classes.appBarScrolled
        }`}
        position="fixed"
      >
        <Toolbar>
          <div className={classes.navigationButtonsContainer}>
            <Button.Icon
              className={classes.navigationButtons}
              onClick={() => history.goBack()}
            >
              <NavigateBeforeIcon />
            </Button.Icon>
            <Button.Icon
              className={classes.navigationButtons}
              onClick={() => history.goForward()}
            >
              <NavigateNextIcon />
            </Button.Icon>
            {props.location.pathname === "/search" ? (
              <Input
                onChange={handleChangeSearchItem}
                placeholder="Search artists and songs ..."
                className={classes.input}
              />
            ) : null}
            {props.location.pathname.includes("/collection") &&
            !props.location.pathname.includes("/tracks") ? (
              <Library />
            ) : null}
          </div>
          {!profile ? (
            <Button.Primary href={login}>Log In</Button.Primary>
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

export default withRouter(Header);
