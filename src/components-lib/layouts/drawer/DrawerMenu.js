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
import { useProfile } from "user";
import { Spacer } from "components-lib/spacer";

export const DrawerMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userPlaylists } = useProfile();
  
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
        <ListItem onClick={() => history.push("/collection/playlists")} button>
          <LibraryMusicIcon />
          <ListItemText className={classes.items} primary="Your Library" />
        </ListItem>
        <ListItem button>
          <AddIcon />
          <ListItemText className={classes.items} primary="Create Playlist" />
        </ListItem>
        <ListItem onClick={() => history.push("/collection/tracks")} button>
          <FavoriteBorderIcon />
          <ListItemText className={classes.items} primary="Liked songs" />
        </ListItem>
      </List>
      <Divider />
      <div className={classes.playLists}>
        {userPlaylists &&
          userPlaylists.items.map((userPlaylist, index) => (
            <ListItem
              key={index}
              onClick={() => history.push(`../playlist/${userPlaylist.id}`)}
              button
            >
              <ListItemText
                className={classes.items}
                primary={userPlaylist.name}
              />
            </ListItem>
          ))}
      </div>
      <Spacer height={300} />
    </Drawer>
  );
};
