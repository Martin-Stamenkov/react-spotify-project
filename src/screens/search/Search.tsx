import { Grid, makeStyles } from "@material-ui/core";
import { Typography } from "components-lib";
import React, { useEffect } from "react";
import { Colors } from "styles";
import { ItemsResult, Genres } from "./component";
import { useSearch } from "./provider";

const useStyles = makeStyles({
  notFoundContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 300,
  },
});

export function Search() {
  const classes = useStyles()
  const { result, setResult }: any = useSearch();

  useEffect(() => {
    return () => {
      setResult(null);
    };
  }, [setResult]);

  if (
    result &&
    result.artists.items.length === 0 &&
    result.tracks.items.length === 0
  ) {
    return (
      <Grid className={classes.notFoundContainer}>
        <Typography customStyle={{ color: Colors.White, fontSize: 24, fontWeight: "bold" }}>
          No results found 
        </Typography>
        <Typography customStyle={{ color: Colors.White }}>
          Please make sure your words are spelled correctly or use less or
          different keywords.{" "}
        </Typography>
      </Grid>
    );
  }

  return <>{result ? <ItemsResult result={result} /> : <Genres />}</>;
}
