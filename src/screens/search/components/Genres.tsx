import React from "react";
import { getListOfCategories } from "api/requests";
import { useQuery } from "react-query";
import { CardContainer, CardMedia, Spacer, Spinner } from "components-lib";
import { Grid } from "@material-ui/core";

interface IGenre {
  id: string;
  name: string;
  icons: { url: string }[];
}

const limitCategories = 45;

export function Genres() {
  const { data, status } = useQuery(
    "categories",
    async () => await getListOfCategories(limitCategories)
  );

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <CardContainer title="Browse All">
            {data &&
              data.items.map((genre: IGenre) => (
                <Grid key={genre.id} item>
                  <CardMedia
                    path={`genre/${genre.id}`}
                    withFlex={false}
                    withPlayButton={false}
                    image={genre.icons[0].url}
                    name={genre.name}
                    height={175}
                    width={170}
                    imageMarginTop={0}
                    titlePosition="absolute"
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
