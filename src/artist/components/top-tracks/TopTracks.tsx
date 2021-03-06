import React from "react";
import { getArtistsTopTracks } from "../../api";
import {
  Spacer,
  Table,
  Typography,
  Switch,
  Spinner,
  Button,
} from "components-lib";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Colors } from "styles";
import { AddAndRemoveTracks, millisecondsConverter } from "utils";
import { Box, Collapse, FormControlLabel } from "@material-ui/core";
interface ITrack {
  id: string;
  album: {
    id: string,
    name: string,
    images: { url: string }[];
  }
  name: string;
  duration_ms: string;
}

export function TopTracks() {
  const { id }: { id: string } = useParams();
  const { data, status } = useQuery(
    "artistsTopTracks",
    async () => await getArtistsTopTracks(id)
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const hasMoreThanFivePopularSongs = data?.tracks.length > 5;

  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <Typography
            customStyle={{ color: Colors.White }}
            variant="h5"
            gutterBottom
          >
            Popular
          </Typography>
          <Collapse
            in={checked}
            collapsedHeight={hasMoreThanFivePopularSongs ? 430 : 0}
          >
            <Table.Container withBottomHeight={false}>
              {data &&
                data.tracks.map((track: ITrack) => (
                  <Table.Row key={track.id} hover>
                    <Table.Cell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {data.tracks.indexOf(track) + 1}
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
                    <Table.Cell align="center">
                      <Button.Link to={`/album/${track.album.id}`}>
                        {track?.album.name}
                      </Button.Link>
                    </Table.Cell>
                    <Table.Cell align="right">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        <AddAndRemoveTracks
                          id={track.id}
                        />
                        {millisecondsConverter(track.duration_ms)}
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Container>
          </Collapse>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label={
              <Typography customStyle={{ color: Colors.WD1F0000 }}>
                {!checked ? "Show more" : "Show less"}
              </Typography>
            }
          />
          <Spacer height={30} />
        </>
      )}
    </>
  );
}
