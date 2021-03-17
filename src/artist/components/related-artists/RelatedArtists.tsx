import { getRelatedArtists } from "../../api";
import { CardContainer, CardMedia, Spinner } from "components-lib";
import React from "react";
import { useQuery } from "react-query";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

interface IArtist {
  id: string;
  images: { url: string }[];
  name: string;
  type: string;
}

export function RelatedArtists() {
  const { id }: { id: string } = useParams();
  const { data, status } = useQuery(
    "relatedArtists",
    async () => await getRelatedArtists(id)
  );

  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : data.artists.length > 0 ? (
        <CardContainer title="Fans Also Like">
          {data.artists?.map((artist: IArtist) => (
            <Grid item key={artist.id}>
              <CardMedia
                id={artist.id}
                path={`../artists/${artist.id}`}
                image={artist.images[0].url}
                name={artist.name}
                description={artist.type}
                withFlex={false}
              />
            </Grid>
          ))}
        </CardContainer>
      ) : null}
    </>
  );
}
