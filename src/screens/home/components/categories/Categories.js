import React, { useEffect, useState } from "react";
import { getCategoryPlaylists } from "api/requests";
import { Grid } from "@material-ui/core";
import { CardMedia, CardContainer } from "components-lib";

const categoryOffset = 5

export function Categories({ id, title }) {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    async function playlistsData() {
      const playlists = await getCategoryPlaylists(id , categoryOffset);
      setPlaylists(playlists);
    }
    playlistsData();
  }, [id]);

  return (
    <>
      {playlists ? (
        <CardContainer title={title}>
          {playlists &&
            playlists.items.map((playlist) => (
              <Grid key={playlist.id} item>
                <CardMedia
                  path={`/playlist/${playlist.id}`}
                  id={playlist.id}
                  type={playlist.type}
                  name={playlist.name}
                  description={playlist.description}
                  image={playlist.images[0].url}
                />
              </Grid>
            ))}
        </CardContainer>
      ) : null}
    </>
  );
}
