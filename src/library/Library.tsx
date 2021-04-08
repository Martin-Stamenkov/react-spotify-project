import { Tabs, Tab } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: 80,
    minHeight: 45,
    fontSize: 12,
  },
  indicator: {
    display: "none",
    marginLeft: 30,
  },
}));

export function Library() {
  const [state, setState] = useState(0);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setState(value);
  };
  const history = useHistory();

  return (
    <>
      <Tabs
        value={state}
        onChange={handleChange}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab
          onClick={() => history.push("/collection/playlists")}
          classes={{ root: classes.tab }}
          label="Playlist"
        />
        <Tab
          onClick={() => history.push("/collection/podcasts")}
          classes={{ root: classes.tab }}
          label="Podcasts"
        />
        <Tab
          onClick={() => history.push("/collection/artists")}
          classes={{ root: classes.tab }}
          label="Artists"
        />
        <Tab
          onClick={() => history.push("/collection/albums")}
          classes={{ root: classes.tab }}
          label="Albums"
        />
      </Tabs>
    </>
  );
}
