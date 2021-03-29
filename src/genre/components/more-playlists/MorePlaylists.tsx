import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CardContainer, CardMedia, Spacer, Spinner } from "components-lib";
import { getCategoryPlaylists } from "api/requests";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useInfiniteScroll } from "hooks";

export function MorePlaylists() {
  const { id }: { id: string } = useParams();
  const [offset, setOffset] = useState(0);

  const { data, status } = useQuery(
    "morePlaylists",
    async () => await getCategoryPlaylists(id, offset)
  );
  const [isFetching, setIsFetching] = useInfiniteScroll(moreData);
  const [playlist, setPlaylist] = useState<any>([]);

  async function moreData() {
    if (playlist.length < data.total) {
      const response = await getCategoryPlaylists(id, offset);
      setPlaylist([...playlist, ...response.items]);
      setOffset(offset + 5);
      setIsFetching(false);
    }
    if (isFetching) {
      return <Spinner />;
    }
  }

  useEffect(() => {
    data && setPlaylist(data.items);
    setOffset(offset + 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        playlist && (
          <>
            <CardContainer title="Popular Playlist">
              {playlist.map((playlist: any, index: number) => (
                <Grid key={index} item>
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
        )
      )}
    </>
  );
}
