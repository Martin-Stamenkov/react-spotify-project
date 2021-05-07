import React from "react";
import {
  Button,
  CardContainer,
  CardMedia,
  Spacer,
  Table,
} from "components-lib";
import { Grid } from "@material-ui/core";
import avatar from "assets/avatar.png";
import { millisecondsConverter } from "utils";

interface IArtist {
  id: string;
  images: { url: string }[];
  name: string;
  type: string;
}

interface ITrack {
  id: string;
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
  name: string;
  duration_ms: string;
}

export function ItemsResult({ result }: any) {
  return (
    <>
      {result.tracks.items.length > 0 ? (
        <>
          <CardContainer withSeeAllFlag title="Songs">
            <Table.Container>
              {result.tracks.items.map((track: ITrack) => (
                <Table.Row key={track.id} hover>
                  <Table.Cell>
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                </Table.Row>
              ))}
            </Table.Container>
          </CardContainer>
        </>
      ) : null}
      {result.artists.items.length > 0 ? (
        <>
          <CardContainer withSeeAllFlag title="Artists">
            {result.artists.items.map((artist: IArtist, index: number) => (
              <Grid key={index} item>
                <CardMedia
                  path={`artists/${artist.id}`}
                  image={
                    artist.images.length > 0 ? artist.images[0].url : avatar
                  }
                  name={artist.name}
                  description={artist.type}
                  withFlex={false}
                  height={274}
                />
              </Grid>
            ))}
          </CardContainer>
          <Spacer height={150} />
        </>
      ) : (
        <Spacer height={150} />
      )}
    </>
  );
}
