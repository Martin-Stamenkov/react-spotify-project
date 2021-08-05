import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from "@material-ui/core";
import spotify from "assets/spotify-transp-white-1.png";
import { useStyles } from "./drawer-menu.styles";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import HearingIcon from '@material-ui/icons/Hearing';
import AddIcon from "@material-ui/icons/Add";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useHistory } from "react-router-dom";
import { useProfile } from "user";
import { Spacer } from "components-lib/spacer";
import { CreatePlaylist } from "playlist/api/requests";
import { getListOfCurrentUserPlaylists } from "user/api";
import { useSnackbar } from "notistack";

export const DrawerMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userPlaylists, profile, setPlaylists, userSavedEpisodes } = useProfile();
  const { enqueueSnackbar } = useSnackbar();

  const onNavigateAfterCreate = async () => {
    const response = await CreatePlaylist(profile.id);
    const updatedPlaylists = await getListOfCurrentUserPlaylists();
    setPlaylists(updatedPlaylists);

    history.push(`/playlist/${response.id}`);
    enqueueSnackbar(`Added playlist ${response.name} to your library!`, {
      variant: "info",
    });
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Box className={classes.logoContainer}>
        <img className={classes.logo} src={spotify} alt="Spotify" />
      </Box>
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
        {profile ? (
          <ListItem button>
            <AddIcon />
            <ListItemText
              onClick={onNavigateAfterCreate}
              className={classes.items}
              primary="Create Playlist"
            />
          </ListItem>
        ) : null}
        <ListItem onClick={() => history.push("/collection/tracks")} button>
          <FavoriteBorderIcon />
          <ListItemText  className={classes.items} primary="Liked songs" />
        </ListItem>
        {userSavedEpisodes && userSavedEpisodes.items.length > 0 ? (
          <ListItem onClick={() => history.push("/collection/episodes")} button>
            <HearingIcon />
            <ListItemText className={classes.items} primary="Your Episodes" />
          </ListItem>
        ) : null}
      </List>
      <Divider />
      <Box className={classes.playLists}>
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
      </Box>
      <Spacer height={300} />
    </Drawer>
  );
};
