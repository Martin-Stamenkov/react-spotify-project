import { About, Button, Spacer, Spinner, Table } from "components-lib";
import React from "react";
import likedSongs from "assets/likedSongs.png";
import { Colors } from "styles";
import { useProfile } from "user";
import { millisecondsConverter } from "utils";
import { format, parseISO } from "date-fns";
import { Box } from "@material-ui/core";

export function LikedSongs() {
  const { profile, userSavedTracks } = useProfile();
  return (
    <>
      {!userSavedTracks ? (
        <Spinner />
      ) : (
        <>
          <About
            backgroundColor={Colors.Purple}
            name="Liked Songs"
            type="playlist"
            avatar={likedSongs}
            additionalInfo={`${profile.display_name} \n\u2022 ${userSavedTracks.total} ${userSavedTracks.total > 1 ? "songs" : "song"
              }`}
            infoAvatar={profile.images[0].url}
            avatarBorderRadius={{ borderRadius: 5 }}
          />
          <Table.Container withBottomHeight withDateAdded>
            {userSavedTracks.items.map((song: any, index: number) => (
              <Table.Row hover key={index}>
                <Table.Cell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {userSavedTracks.items.indexOf(song) + 1}
                    <img
                      style={{
                        width: 40,
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                      alt="avatar"
                      src={song.track.album.images[2].url}
                    />
                    <Box
                      display="flex"
                      flexDirection="column"
                      marginTop="10"
                    >
                      {song.track.name}
                      <Box display="flex">
                        {song.track.artists.map(
                          (x: { id: string; name: string }, index: number) => (
                            <Box key={index} marginLeft={1}>
                              <Button.Link to={`/artists/${x.id}`}>
                                {`${"\n\u2022"} ${x.name}`}
                              </Button.Link>
                              <Spacer width={3} />
                            </Box>
                          )
                        )}
                      </Box>
                    </Box>
                  </div>
                </Table.Cell>
                <Table.Cell align="center">
                  <Button.Link to={`/album/${song.track.album.id}`}>
                    {song.track.album.name}
                  </Button.Link>
                </Table.Cell>
                <Table.Cell align="right">
                  {format(parseISO(song.added_at), "LLL dd, yyyy")}
                </Table.Cell>
                <Table.Cell align="right">
                  {millisecondsConverter(song.track.duration_ms)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Container>
        </>
      )
      }
    </>
  );
}
