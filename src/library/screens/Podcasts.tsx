import { Grid } from "@material-ui/core";
import { CardContainer, CardMedia, Spacer } from "components-lib";
import { FollowYourFirst } from "../components";
import React from "react";
import { useProfile } from "user";

interface IUserPodcasts {
  show: {
    id: string;
    images: { url: string }[];
    name: string;
    description: string;
  };
}

export function Podcasts() {
  const { userShows } = useProfile();

  return (
    <>
      {userShows && userShows.items.length === 0 ? (
        <FollowYourFirst
          title="Follow your first podcast"
          description="Follow podcasts you like by tapping the follow button."
          buttonTitle="Find Podcasts"
        />
      ) : (
        <>
          <CardContainer title="Podcasts">
            {userShows &&
              userShows.items.map((podcast: IUserPodcasts, index: number) => (
                <Grid item key={index}>
                  <CardMedia
                    id={podcast.show.id}
                    // path={`/album/${podcast.show.id}`}
                    image={podcast.show.images[0].url}
                    name={podcast.show.name}
                    description={podcast.show.description}
                  />
                </Grid>
              ))}
          </CardContainer>
          <Spacer height={150} />
        </>
      )}
      ;
    </>
  );
}
