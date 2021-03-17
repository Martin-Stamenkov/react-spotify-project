import React from "react";
import { useQuery } from "react-query";
import { About, Spacer } from "components-lib";
import { getGenreDetails } from "./api";
import { useParams } from "react-router-dom";
import { GenrePlaylist } from "./components";

export function GenreDetails() {
  const { id }: { id: string } = useParams();

  const { data, status } = useQuery(
    "genre",
    async () => await getGenreDetails(id)
  );

  return (
    <>
      {data && (
        <>
          <About avatar={data.icons[0].url} name={data.name} />
          <GenrePlaylist id={data.id} />
          <Spacer height={150} />
        </>
      )}
    </>
  );
}
