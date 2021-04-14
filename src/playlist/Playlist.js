import React, { useEffect, useState } from "react";
import { Table, About, Spinner, Button,  Dialog } from "components-lib";
import { useHistory, useParams } from "react-router-dom";
import { getPlaylist, RemovePlaylist } from "./api/requests";
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
  const history = useHistory();
  const { userPlaylists, setPlaylists, profile } = useProfile();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  console.log(data);

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

  const handleUpdatePlaylist = async () => {};

  // console.log(userPlaylists)

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          {data && (
            <>
              <About
                backgroundColor={data.primary_color && data.primary_color}
                type={data.type}
                avatar={data.images.length > 0 ? data.images[0].url : avatar}
                name={data.name}
                avatarBorderRadius={{ borderRadius: 5 }}
                description={data.description}
                additionalInfo={`${data.owner.display_name} \n\u2022 Followers ${data.followers.total} \n\u2022 ${data.tracks.items.length} songs`}
              />
              {data.owner.display_name === profile.display_name ? (
                <>
                  <Button.Primary onClick={() => setOpenEditDialog(true)}>
                    Edit
                  </Button.Primary>
                  <Dialog.Form
                    title={`Edit Details`}
                    buttonTitle="Save"
                    src={avatar}
                    open={openEditDialog}
                    playlistTitle={data.name}
                    playlistDescription={data.description}
                    handleClose={() => setOpenEditDialog(false)}
                    handleClickCancel={() => setOpenEditDialog(false)}
                    handleClick={handleUpdatePlaylist}
                  />
                  <Button.Primary
                    onClick={handleDeleteClick}
                    customStyle={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button.Primary>
                  <Dialog.Base
                    title={`Delete ${data.name}?`}
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
                {data.tracks.items.length === 0 ? null : (
                  <>
                    <Table.Container withBottomHeight withDateAdded>
                      {data.tracks.items.map((item, index) => (
                        <Table.Row key={index} hover>
                          <Table.Cell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {data.tracks.items.indexOf(item) + 1}
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
