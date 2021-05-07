import React, { useEffect, useState } from "react";
import { Table, About, Spinner, Button,  Dialog } from "components-lib";
import { useHistory, useParams } from "react-router-dom";
import { EditPlaylistDetails, getPlaylist, RemovePlaylist } from "./api/requests";
import { format, parseISO } from "date-fns";
import { millisecondsConverter } from "utils";
import { useQuery } from "react-query";
import avatar from "assets/music_placeholder.png";
import { useProfile } from "user";
import { useSnackbar } from "notistack";

export function Playlist() {
  const { id } = useParams();
  const { data, status } = useQuery(
    "playlist",
    async () => await getPlaylist(id)
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [playlist, setPlaylist] = useState(false);
  const history = useHistory();
  const { userPlaylists, setPlaylists, profile } = useProfile();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    name: "",
    description: ""
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
   playlist && setInputs({...inputs, name: playlist.name, description: playlist.description})
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist])

  useEffect(() => {
    setPlaylist(data)
  }, [data])

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
    setPlaylist(updatedPlaylist)
    enqueueSnackbar(`The details for the current playlist was edited!`, { variant: "info" });
    setOpenEditDialog(false)
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setInputs({
      ...inputs,
      [evt.target.name]: value
    });
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
                backgroundColor={playlist.primary_color && playlist.primary_color}
                type={playlist.type}
                avatar={playlist.images.length > 0 ? playlist.images[0].url : avatar}
                name={playlist.name}
                avatarBorderRadius={{ borderRadius: 5 }}
                description={playlist.description}
                additionalInfo={`${playlist.owner.display_name} \n\u2022 Followers ${playlist.followers.total} \n\u2022 ${playlist.tracks.items.length} songs`}
              />
              {playlist.owner.display_name === profile.display_name ? (
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
              ) : null}
              <>
                {playlist.tracks.items.length === 0 ? null : (
                  <>
                    <Table.Container withBottomHeight withDateAdded>
                      {playlist.tracks.items.map((item, index) => (
                        <Table.Row key={index} hover>
                          <Table.Cell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                {item.track?.name}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  {item.track?.artists.map((x, index) => (
                                    <div key={index}>
                                      <Button.Link to={`/artists/${x.id}`}>
                                        {`${"\n\u2022"} ${x.name}`}
                                      </Button.Link>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Table.Cell>
                          <Table.Cell align="right">
                            <Button.Link to={`/album/${item.track?.album.id}`}>
                              {item.track?.album.name}
                            </Button.Link>
                          </Table.Cell>
                          <Table.Cell align="right">
                            {format(parseISO(item.added_at), "LLL dd, yyyy")}
                          </Table.Cell>
                          <Table.Cell align="right">
                            {millisecondsConverter(item.track?.duration_ms)}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Container>
                  </>
                )}
              </>
            </>
          )}
        </>
      )}
    </>
  );
}
