import { Grid } from "@material-ui/core";
import {
  About,
  Button,
  Spacer,
  Spinner,
  Table,
  Typography,
} from "components-lib";
import { format, parseISO } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Colors } from "styles";
import { truncate } from "utils";
import { getShow } from "./api/requests";
import { Description } from "./components/Description";

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
          <Grid style={{ display: "flex" }}>
            <Grid>
              {data &&
                data.episodes.items.map((episode: IEpisode) => (
                  <Table.Row key={episode.id} hover>
                    <Button.Link to={`/episode/${episode.id}`}>

                      <Table.Cell>
                        <Grid style={{ display: "flex", alignItems: "center" }}>
                          <img
                            style={{
                              marginRight: 10,
                              marginLeft: 10,
                              width: 150,
                              borderRadius: 10,
                            }}
                            alt="avatar"
                            src={episode.images[1].url}
                          />
                          <Grid
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography customStyle={{ fontWeight: 900 }}>
                              {episode.name}
                            </Typography>
                            <Spacer height={20} />
                            <Typography
                              customStyle={{ fontSize: 14, color: Colors.Grey02 }}
                            >
                              {truncate(episode.description, {
                                length: 175,
                                separator: " ",
                              })}
                            </Typography>
                            <Grid
                              style={{
                                margin: 5,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Button.Play
                                buttonColor={Colors.Black01}
                                buttonBackgroundColor={Colors.White}
                                position="inherit"
                              />
                              <Typography
                                customStyle={{
                                  fontSize: 14,
                                  color: Colors.Grey02,
                                  marginLeft: 10,
                                }}
                              >
                                {format(parseISO(episode.release_date), "LLL dd")}
                                {"\n\u2022"} {"\n"}
                                {`${Math.round(episode.duration_ms / 60000)} min`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Table.Cell>
                    </Button.Link>
                  </Table.Row>
                ))}
            </Grid>
            <Grid>
              <Description description={data.description}></Description>
            </Grid>
          </Grid>
          <Spacer height={100} />
        </>
      )}
    </>
  );
}
