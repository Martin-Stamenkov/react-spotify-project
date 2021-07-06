import React from "react";
import { Table, Button, Spacer } from "components-lib";
import { millisecondsConverter } from "utils";
import { Table as MUTable } from "@material-ui/core";
import {
  AddTrackToPlaylist,
} from "../api/requests";
import { useProfile } from "user"
import {
  getPlaylist,
} from "../api/requests";

export function SearchedTracksTable({ result, playlistId }) {
  const { setOwnPlaylist } = useProfile();

  const handleAddTracks = async (uri) => {
    await AddTrackToPlaylist(playlistId, uri)
    const updatedPlaylist = getPlaylist(playlistId)
    setOwnPlaylist(updatedPlaylist)
  }

  return (
    <>
      <MUTable>
        {result &&
          result.tracks.items.map((track) => (
            <Table.Row key={track.id} hover>
              <Table.Cell>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {result.tracks.items.indexOf(track) + 1}
                  <img
                    style={{
                      width: 40,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                    alt="avatar"
                    src={track.album?.images[2].url}
                  />
                  {track.name}
                </div>
              </Table.Cell>
              <Table.Cell align="right">
                <Button.Link to={`/album/${track.album.id}`}>
                  {track?.album.name}
                </Button.Link>
              </Table.Cell>
              <Table.Cell align="right">
                {millisecondsConverter(track.duration_ms)}
              </Table.Cell>
              <Table.Cell align="right">
                <Button.Primary
                  onClick={() => handleAddTracks(track.uri)}
                  customStyle={{ borderRadius: 50 }}
                >
                  Add
                </Button.Primary>
              </Table.Cell>
            </Table.Row>
          ))}
      </MUTable>
      <Spacer height={100} />
    </>
  );
}
