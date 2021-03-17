import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import spotify from "assets/spotify-transp-white-1.png";
import { useStyles } from "./drawer-menu.styles";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddIcon from "@material-ui/icons/Add";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useHistory } from "react-router-dom";

export const DrawerMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={spotify} alt="Spotify" />
      </div>
      <List>
        <ListItem onClick={() => history.push("/home")} button>
          <HomeIcon />
          <ListItemText className={classes.items} primary="Home" />
        </ListItem>
        <ListItem onClick={() => history.push("/search")} button>
          <SearchIcon />
          <ListItemText className={classes.items} primary="Search" />
        </ListItem>
        <ListItem button>
          <LibraryMusicIcon />
          <ListItemText className={classes.items} primary="Your Library" />
        </ListItem>
        <ListItemText className={classes.playList} primary="Playlist" />
        <ListItem button>
          <AddIcon />
          <ListItemText className={classes.items} primary="Create Playlist" />
        </ListItem>
        <ListItem button>
          <FavoriteBorderIcon />
          <ListItemText className={classes.items} primary="Liked songs" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};
