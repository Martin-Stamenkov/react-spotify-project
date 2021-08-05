import { Box, Grid } from "@material-ui/core";
import {
  About,
  Spacer,
  Spinner,
  Table,
} from "components-lib";
import { Episode } from "episode";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getShow } from "./api/requests";
import { Description } from "./components";

interface IEpisode {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  release_date: string;
  duration_ms: number;
}

export function Podcast() {
  const { id }: { id: string } = useParams();
  const { data, status } = useQuery("show", async () => await getShow(id));

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <About
            type="podcast"
            name={data.name}
            description={data.publisher}
            avatarBorderRadius={{ borderRadius: 10 }}
            avatar={data.images[0].url}
          />
          <Box display="flex">
            <Table.Container withHeader={false}>
              {data &&
                data.episodes.items.map((episode: IEpisode, index: number) => (
                  <Episode id={episode.id.toString()}
                    description={episode.description}
                    duration_ms={episode.duration_ms}
                    images={episode.images[1].url}
                    name={episode.name}
                    release_date={episode.release_date}
                    key={index} />
                ))}
            </Table.Container>
            <Grid>
              <Description description={data.description}></Description>
            </Grid>
            <Spacer height={100} />
          </Box>
        </>
      )}
    </>
  );
}
