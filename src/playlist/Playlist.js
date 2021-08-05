import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  About,
  Spinner,
  Button,
  Dialog,
  Spacer,
  ErrorPrompt,
  Input,
  Typography,
} from "components-lib";
import { useHistory, useParams } from "react-router-dom";
import {
  EditPlaylistDetails,
  FollowPlaylist,
  getPlaylist,
  RemovePlaylist,
} from "./api/requests";
import { format, parseISO } from "date-fns";
import { millisecondsConverter } from "utils";
import { useQuery } from "react-query";
import avatar from "assets/music_placeholder.png";
import { useProfile, getListOfCurrentUserPlaylists } from "user";
import { useSnackbar } from "notistack";
import { Box } from "@material-ui/core";
import { useSearch } from "screens";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "styles";
import { SearchedTracksTable } from "./components";
import { AddAndRemoveTracks } from "utils";

const searchLimit = 10;
const initialOffset = 5;

export const useStyles = makeStyles({
  input: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    width: "30%",
    "& .MuiOutlinedInput-root": {
      height: 40,
    },
  },
  hover: {
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "&:hover": {
      "& .MuiButtonBase-root": {
        display: "block",
      },
    },
  },
});

export function Playlist() {
  const { id } = useParams();
  const { data, status } = useQuery(
    "playlist",
    async () => await getPlaylist(id)
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [playlist, setPlaylist] = useState();
  const history = useHistory();
  const {
    userPlaylists,
    setPlaylists,
    profile,
    setOwnPlaylist,
    userOwnPlaylist,
  } = useProfile();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });
  const isOwner =
    playlist && playlist.owner.display_name === profile.display_name;
  const hasTracks = playlist && playlist.tracks.items.length > 0;
  const memorizedIsFollowedValue = useMemo(
    () =>
      userPlaylists &&
      userPlaylists.items.some((playlist) => playlist.id === id),
    [userPlaylists, id]
  );
  const [isFollowed, setIsFollowed] = useState(memorizedIsFollowedValue);
  const classes = useStyles();
  const { searchForAnItem, setResult, result } = useSearch();

  useEffect(() => {
    window.scrollTo({
      top: 0, behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    playlist &&
      setInputs({
        ...inputs,
        name: playlist.name,
        description: playlist.description,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  useEffect(() => {
    if (isOwner) {
      setOwnPlaylist(data);
      setPlaylist(userOwnPlaylist);
    } else {
      setPlaylist(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isOwner]);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeletePlaylist = async () => {
    await RemovePlaylist(id);
    const updatedPlaylists = userPlaylists.items.filter((x) => x.id !== id);
    setPlaylists({ items: updatedPlaylists });
    history.push("/collection/playlists");
    enqueueSnackbar(`Removed from your library!`, { variant: "info" });
  };

  const handleUpdatePlaylist = async () => {
    await EditPlaylistDetails(id, inputs.name, inputs.description);
    const updatedPlaylist = await getPlaylist(id);
    setPlaylist(updatedPlaylist);
    enqueueSnackbar(`The details for the current playlist was edited!`, {
      variant: "info",
    });
    setOpenEditDialog(false);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setInputs({
      ...inputs,
      [evt.target.name]: value,
    });
  }

  const handleChangeSearchItem = (event) => {
    const value = event.target.value;

    searchForAnItem(value, searchLimit, initialOffset);
    if (value === "") {
      setResult(null);
    }
  };
  
  const handleFollowClick = async () => {
    if (!isFollowed) {
      await FollowPlaylist(id);
    } else {
      await RemovePlaylist(id);
    }
    const playlists = await getListOfCurrentUserPlaylists();
    setPlaylists(playlists);
    setIsFollowed(playlists.items.some((playlist) => playlist.id === id));
    enqueueSnackbar(
      !isFollowed ? "Saved to your library" : "Removed from your library",
      { variant: "info" }
    );
  };

  useEffect(() => {
    return () => {
      setResult(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "error") {
    return <ErrorPrompt />;
  }

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          {playlist && (
            <>
              <About
                backgroundColor={
                  playlist.primary_color && playlist.primary_color
                }
                type={playlist.type}
                avatar={
                  playlist.images.length > 0 ? playlist.images[0].url : avatar
                }
                name={playlist.name}
                avatarBorderRadius={{ borderRadius: 5 }}
                description={playlist.description}
                additionalInfo={`${playlist.owner.display_name} 
                \n\u2022 Followers ${playlist.followers.total} 
                \n\u2022 ${playlist.tracks.items.length} songs`}
              />
              <Box display="flex" alignItems="center">
                {hasTracks ? (
                  <Button.Play position={"inherit"} width={60} height={60} />
                ) : null}
                <Spacer width={20} />
                {!isOwner ? (
                  <Button.Favorite
                    isFavorite={isFollowed}
                    onClick={handleFollowClick}
                    width={40}
                    height={40}
                  />
                ) : null}
              </Box>
              <Spacer height={20} />
              <>
                {isOwner ? (
                  <>
                    <Button.Primary onClick={() => setOpenEditDialog(true)}>
                      Edit
                    </Button.Primary>
                    <Dialog.Form
                      title={`Edit Details`}
                      buttonTitle="Save"
                      src={avatar}
                      open={openEditDialog}
                      playlistTitle={playlist.name}
                      playlistDescription={playlist.description}
                      handleClose={() => setOpenEditDialog(false)}
                      handleClickCancel={() => setOpenEditDialog(false)}
                      handleClick={handleUpdatePlaylist}
                      onChange={handleChange}
                      titleName="name"
                      descriptionName="description"
                    />
                    <Button.Primary
                      onClick={handleDeleteClick}
                      customStyle={{ marginLeft: 10 }}
                    >
                      Delete
                    </Button.Primary>
                    <Spacer height={20} />
                  </>
                ) : null}
                <Dialog.Base
                  title={`Delete ${playlist.name}?`}
                  description="This action cannot be undone."
                  buttonTitle="Delete"
                  open={openDeleteDialog}
                  handleClose={() => setOpenDeleteDialog(false)}
                  handleClickCancel={() => setOpenDeleteDialog(false)}
                  handleClick={handleDeletePlaylist}
                />
              </>
              {hasTracks ? (
                <>
                  <Table.Container withDateAdded withBottomHeight={false}>
                    {playlist.tracks.items.map((item, index) => (
                      <Table.Row key={index} hover>
                        <Table.Cell>
                          <Box display="flex" alignItems="center">
                            {playlist.tracks.items.indexOf(item) + 1}
                            <img
                              style={{
                                width: 40,
                                marginRight: 10,
                                marginLeft: 10,
                              }}
                              alt="avatar"
                              src={item.track?.album.images[2].url}
                            />
                            <Box display="flex" flexDirection="column">
                              {item.track?.name}
                              <Box display="flex" flexDirection="row">
                                {item.track?.artists
                                  .map((x, index) => (
                                    <Button.Link
                                      key={index}
                                      to={`/artists/${x.id}`}
                                    >
                                      {x.name}
                                    </Button.Link>
                                  ))
                                  .reduce((prev, curr) => [prev, ", ", curr])}
                              </Box>
                            </Box>
                          </Box>
                        </Table.Cell>
                        <Table.Cell align="center">
                          <Button.Link to={`/album/${item.track?.album.id}`}>
                            {item.track?.album.name}
                          </Button.Link>
                        </Table.Cell>
                        <Table.Cell align="right">
                          {format(parseISO(item.added_at), "LLL dd, yyyy")}
                        </Table.Cell>
                        <Table.Cell align="right">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <AddAndRemoveTracks
                              id={item.track.id}
                            />
                            {millisecondsConverter(item.track?.duration_ms)}
                          </Box>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Container>
                  <Spacer height={20}/>
                  {!isOwner ? <Spacer height={100} /> : null}
                </>
              ) : null}
              <>
                {isOwner ? (
                  <>
                    <Box>
                      <Spacer height={20} />
                      <Typography
                        customStyle={{
                          color: Colors.White,
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        Lets find something for your playlist
                      </Typography>
                      <Input
                        onChange={handleChangeSearchItem}
                        placeholder="Search for songs ..."
                        className={classes.input}
                      />
                    </Box>
                    <SearchedTracksTable
                      result={result}
                      playlistId={playlist.id}
                    />
                    <Spacer height={20} />
                  </>
                ) : null}
              </>
            </>
          )}
        </>
      )}
    </>
  );
}
