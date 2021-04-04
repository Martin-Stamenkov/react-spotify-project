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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  const [state, setState] = useState(0);
  const handleChange = (event, value) => {
    setState(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      Storage.setItem("accessToken", _token);
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        className={`${classes.appBar} ${trigger === false ? "" : classes.appBarScrolled
          }`}
        position="fixed"
      >
        <Toolbar>
          <div className={classes.navigationButtonsContainer}>
            <Button.Icon className={classes.navigationButtons} onClick={() => history.goBack()}>
              <NavigateBeforeIcon />
            </Button.Icon>
            <Button.Icon className={classes.navigationButtons}  onClick={() => history.goForward()}>
              <NavigateNextIcon />
            </Button.Icon>
            {
              props.location.pathname === ('/search') ?
                <Input /> : null
            }
            {
              props.location.pathname === ('/collection') ?
                <Tabs
                  value={state}
                  onChange={handleChange}
                  classes={{
                    indicator: classes.indicator
                  }}>

                  <Tab  classes={{ root: classes.tab }}  label="Playlist" />
                  <Tab  classes={{ root: classes.tab }} label="Podcasts" />
                  <Tab  classes={{ root: classes.tab }} label="Artists" />
                  <Tab  classes={{ root: classes.tab }} label="Albums" />
                </Tabs>

                : null
            }
          </div>
          {!profile ? (
            <MButton color="primary" className="btn btn--loginApp-link" href={login}>
              Login In
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
    </div >
  );
};

export default withRouter(Header);
