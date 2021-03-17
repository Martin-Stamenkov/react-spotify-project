import React from "react";
import { useQuery } from "react-query";
import { About, CardContainer, CardMedia, Spacer } from "components-lib";
import { getCategoryPlaylists } from "api/requests";
import { Grid } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";

interface IGenrePlaylist {
  id: string;
}

export function GenrePlaylist({ id }: IGenrePlaylist) {
  const { data, status } = useQuery(
    "genrePlaylists",
    async () => await getCategoryPlaylists(id,5)
  );
  console.log(data);


  return (
    <>
      {data && (
        <>
          <CardContainer path={`/genre/playlist/${id}`} title="Popular Playlist" withSeeAllFlag> 
            {data &&
              data.items.map((playlist: any) => (
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
