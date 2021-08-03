import { About, Button, Spacer, Table, Typography } from "components-lib";
import React from "react";
import likedEpisodes from "assets/streaming.png";
import { Colors } from "styles";
import { useProfile } from "user";
import {  truncate } from "utils";
import { format, parseISO } from "date-fns";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface IEpisode {
  episode: {
    id: number
    images: { url: string }[];
    name: string;
    description: string;
    release_date: string;
    duration_ms: number;
  }
}

export function LikedEpisodes() {

    const { profile, userEpisodes } = useProfile();
    const history = useHistory()

    return (
        profile && userEpisodes &&
        <>

            <About
                backgroundColor={Colors.SecondaryGreen}
                name="Liked Episodes"
                type="playlist"
                avatar={likedEpisodes}
                additionalInfo={`${profile.display_name} \n\u2022 ${userEpisodes.total} ${userEpisodes.total > 1 ? "episodes" : "episode"
                    }`}
                infoAvatar={profile.images[0].url}
                avatarBorderRadius={{ borderRadius: 5 }}
            />
             <Table.Container withHeader={false}>
              {userEpisodes &&
                userEpisodes.items.map((e: IEpisode, index: number) => (
                  <Table.Row onClick={() => history.push(`/episode/${e.episode.id}`)} key={index} hover>
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
                            src={e.episode.images[0].url}
                          />
                          <Grid
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography customStyle={{ fontWeight: 900 }}>
                              {e.episode.name}
                            </Typography>
                            <Spacer height={20} />
                            <Typography
                              customStyle={{ fontSize: 14, color: Colors.Grey02 }}
                            >
                              {truncate(e.episode.description, {
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
                                {format(parseISO(e.episode.release_date), "LLL dd")}
                                {"\n\u2022"} {"\n"}
                                {`${Math.round(e.episode.duration_ms / 60000)} min`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Container>
          <Spacer height={100} />
        </>
    );
}
