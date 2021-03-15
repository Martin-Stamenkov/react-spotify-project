import { getArtistAlbums } from "../../api";
import { CardContainer, CardMedia, Spinner } from "components-lib";
import React from "react";
import { useQuery } from "react-query";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

interface IAlbums {
  albumLimit?: number;
}

interface IAlbum {
  id: string;
  images: { url: string }[];
  name: string;
  release_date: string;
  album_type: string;
}

const defaultAlbumLimit = 7;

export function Albums({ albumLimit = defaultAlbumLimit }: IAlbums) {
  const { id }: { id: string } = useParams();
  const { data, status } = useQuery(
    "artistAlbums",
    async () => await getArtistAlbums(id, albumLimit)
  );

  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : data.items?.length > 0 ? (
        <CardContainer
          path={`/artists/discography/${id}`}
          withSeeAllFlag
          title="Discography"
        >
          {data &&
            data.items.map((album: IAlbum, index: number) => (
              <Grid item key={index}>
                <CardMedia
                  path={`album/${album.id}`}
                  id={album.id}
                  image={album.images[0].url}
                  name={album.name}
                  description={`${album.release_date.substring(
                    0,
                    4
                  )} \n\u2022  ${album.album_type}`}
                  withFlex={false}
                />
              </Grid>
            ))}
        </CardContainer>
      ) : null}
    </>
  );
}
