import React from "react";
import { useQuery } from "react-query";
import { CardContainer, CardMedia, Spacer, Spinner } from "components-lib";
import { getCategoryPlaylists } from "api/requests";
import { Grid } from "@material-ui/core";

interface IPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
}

interface IGenrePlaylist {
  id: string;
}

export function GenrePlaylist({ id }: IGenrePlaylist) {
  const { data, status } = useQuery(
    "genrePlaylists",
    async () => await getCategoryPlaylists(id, 5)
  );

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <CardContainer
            path={`/genre/playlist/${id}`}
            title="Popular Playlist"
            withSeeAllFlag
          >
            {data &&
              data.items.map((playlist: IPlaylist) => (
                <Grid key={playlist.id} item>
                  <CardMedia
                    path={`../playlist/${playlist.id}`}
                    image={playlist.images[0].url}
                    name={playlist.name}
                    description={playlist.description}
                  />
                </Grid>
              ))}
          </CardContainer>
          <Spacer height={150} />
        </>
      )}
    </>
  );
}
