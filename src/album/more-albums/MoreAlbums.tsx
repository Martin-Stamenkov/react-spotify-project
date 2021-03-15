import React from "react";
import { Grid } from "@material-ui/core";
import { CardMedia, CardContainer, Spinner } from "components-lib";
import { useQuery } from "react-query";
import { getMoreAlbums } from "../api";
import { format, parseISO } from "date-fns";

interface IAlbum {
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
}

export function MoreAlbums({ id, artistName }: any) {
  const { data, status } = useQuery(
    "moreAlbums",
    async () => await getMoreAlbums(id)
  );

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <CardContainer title={`More By ${artistName}`}>
          {data &&
            data!.items?.map((album: IAlbum, index: number) => (
              <Grid key={index} item>
                <CardMedia
                  withFlex={false}
                  path={`/album/${album.id}`}
                  id={album.id}
                  name={album.name}
                  description={format(parseISO(album.release_date), "yyyy")}
                  image={album.images[0].url}
                />
              </Grid>
            ))}
        </CardContainer>
      )}
    </>
  );
}
