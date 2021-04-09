import { Grid } from "@material-ui/core";
import { CardContainer, CardMedia, Spacer } from "components-lib";
import { FollowYourFirst } from "../components";
import React from "react";
import { useProfile } from "user";

interface IArtist {
  id: string;
  images: { url: string }[];
  name: string;
  type: string;
}

export function Artists() {
  const { followedArtists } = useProfile();


  return (
    <>
    {followedArtists && followedArtists.items.length === 0 ? (
      <FollowYourFirst
        title="Follow your first artist"
        description="Save artists by tapping the heart icon."
        buttonTitle="Find Artists"
      />
    ) : (
    <>
      <CardContainer title="Artists">
        {followedArtists &&
          followedArtists.items.map((artist: IArtist, index: number) => (
            <Grid item key={index}>
              <CardMedia
                id={artist.id}
                path={`/artists/${artist.id}`}
                image={artist.images[0].url}
                name={artist.name}
                description={artist.type}
                withCircleAvatar
                height={275}
                withFlex={false}
              />
            </Grid>
          ))}
      </CardContainer>
      <Spacer height={150} />
    </>
  )}
  </>
  )
}
