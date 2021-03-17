import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getListOfCategories } from "api/requests";
import { useQuery } from "react-query";
import { CardContainer, CardMedia, Spacer } from "components-lib";
import { Grid } from "@material-ui/core";

const limitCategorites = 45;

export function Search() {
  const { data, status } = useQuery(
    "categories",
    async () => await getListOfCategories(limitCategorites)
  );
  console.log(data);

  return (
    <>
      <CardContainer title="Browse All">
        {data &&
          data.items.map((genre: any) => (
            <Grid key={genre.id} item>
              <CardMedia
                path={`genre/${genre.id}`}
                withFlex={false}
                withPlayButton={false}
                image={genre.icons[0].url}
                name={genre.name}
                height={185}
                width={190}
                imageMarginTop={0}
                titlePosition="absolute"
              />
            </Grid>
          ))}
      </CardContainer>
      <Spacer height={150} />
    </>
  );
}
