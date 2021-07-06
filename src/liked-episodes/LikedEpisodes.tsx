import { About, Button, Spacer, Spinner, Table } from "components-lib";
import React from "react";
import { useQuery } from "react-query";
import likedEpisodes from "assets/streaming.png";
import { Colors } from "styles";
import { useProfile } from "user";
import { millisecondsConverter } from "utils";
import { format, parseISO } from "date-fns";
import { getLikedSongs } from "liked-songs/api";

export function LikedEpisodes() {

    const { profile, userEpisodes } = useProfile();

    return (
        profile && userEpisodes &&
        <>

            <About
                backgroundColor={Colors.SecondaryGreen}
                name="Liked Songs"
                type="playlist"
                avatar={likedEpisodes}
                additionalInfo={`${profile.display_name} \n\u2022 ${userEpisodes.total} ${userEpisodes.total > 1 ? "episodes" : "episode"
                    }`}
                infoAvatar={profile.images[0].url}
                avatarBorderRadius={{ borderRadius: 5 }}
            />
            {/* <Table.Container withBottomHeight withDateAdded>
            {data.items.map((song: any, index: number) => (
              <Table.Row hover key={index}>
                <Table.Cell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {data.items.indexOf(song) + 1}
                    <img
                      style={{
                        width: 40,
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                      alt="avatar"
                      src={song.track.album.images[2].url}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      {song.track.name}
                      {song.track.artists.map(
                        (x: { id: string; name: string }, index: number) => (
                          <div key={index}>
                            <Button.Link to={`/artists/${x.id}`}>
                              {`${"\n\u2022"} ${x.name}`}
                            </Button.Link>
                            <Spacer width={3} />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell align="right">
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
          </Table.Container> */}
        </>
    );
}
