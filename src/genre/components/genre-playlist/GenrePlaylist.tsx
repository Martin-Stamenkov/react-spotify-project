import React, { useEffect, useState } from "react";
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
  const [playlist, setPlaylist] = useState<any>();
  useEffect(() => {
    async function GetData() {
      const response = await getCategoryPlaylists(id, 5);
      setPlaylist(response);
    }
    GetData();
  }, [id]);

  return (
    <>
      {!playlist ? (
        <Spinner />
      ) : (
        <>
          <CardContainer
            path={`/genre/playlist/${id}`}
            title="Popular Playlist"
            withSeeAllFlag
          >
            {playlist.items.map((playlist: IPlaylist) => (
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
