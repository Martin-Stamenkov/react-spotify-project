import { Grid } from "@material-ui/core";
import { CardContainer, CardMedia, Spacer } from "components-lib";
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
  );
}
