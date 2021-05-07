import {
  About,
  Button,
  Spacer,
  Spinner,
  Table,
  Typography,
} from "components-lib";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Colors } from "styles";
import { millisecondsConverter } from "utils";
import { getAlbum } from "./api/requests";
import { MoreAlbums } from "./more-albums/MoreAlbums";
import { withRouter } from "react-router";
import { format, parseISO } from "date-fns";

interface ITrack {
  id: string;
  album: {
    id:string,
    name: string,
    images: { url: string }[];
  }
  name: string;
  duration_ms: string;
  artists: any;
}

export function Album() {
  const { id }: { id: string } = useParams();

  const { data, status } = useQuery("album", async () => await getAlbum(id));
  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <About
            type={data.type}
            name={data.name}
            avatar={data.images[0].url}
            additionalInfo={`${data.artists
              .map((x: { name: string }) => x.name)
              .join("\n\u2022\n")} \n\u2022\n ${format(
              parseISO(data.release_date),
              "yyyy"
            )} \n\u2022\n ${data.total_tracks} ${
              data.total_tracks > 1 ? "songs" : "song"
            }`}
          />
          <Table.Container withAlbum={false}>
            {data.tracks.items.map((track: ITrack, index: number) => (
              <Table.Row key={index} hover>
                <Table.Cell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginRight: 10,
                      }}
                    >
                      {data.tracks.items.indexOf(track) + 1}
                    </div>
                    {track.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 15,
                    }}
                  >
                    {track && track.artists.map(
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
                </Table.Cell>
                <Table.Cell align="right">
                  {millisecondsConverter(track.duration_ms)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Container>
          <Spacer height={50} />
          <Typography customStyle={{ color: Colors.Grey02 }}>
            {data.copyrights[0].text}
          </Typography>
          <MoreAlbums
            id={data.artists[0].id}
            artistName={data.artists[0].name}
          />
          <Spacer height={150} />
        </>
      )}
    </>
  );
}
export default withRouter(Album);
