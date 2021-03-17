import React from "react";
import { useProfile, UserProfilePage } from "user";
import { Route, Switch } from "react-router-dom";
import { Home, Search } from "screens";
import { Playlist } from "playlist";
import { Artist, Discography } from "artist";
import { Album } from "album";
import { GenreDetails, MorePlaylists } from "genre";

export function Router() {
  const { profile } = useProfile();

  return (
    <>
      {!profile ? (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={UserProfilePage} />
          <Route path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/playlist/:id" component={Playlist} />
          <Route exact path="/artists/:id" component={Artist} />
          <Route path="/album/:id" component={Album} />
          <Route
            exact
            path="/artists/discography/:id/"
            component={Discography}
          />
          <Route exact path="/genre/:id" component={GenreDetails} />
          <Route  path="/genre/playlist/:id/" exact component={MorePlaylists} />
        </Switch>
      )}
    </>
  );
}
