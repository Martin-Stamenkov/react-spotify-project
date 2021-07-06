import React from "react";
import { useProfile, UserProfilePage } from "user";
import { Route, Switch } from "react-router-dom";
import { Home, Search, Songs, Artists as ArtistsFromSearch, Login } from "screens";
import { Playlist } from "playlist";
import { Artist, Discography } from "artist";
import { Album } from "album";
import { GenreDetails, MorePlaylists } from "genre";
import { Playlists, Artists, Albums, Podcasts } from "library";
import { LikedSongs } from "liked-songs";
import { uniqueId } from "utils";
import { Podcast } from "podcast";
import { Storage } from "storage";
import { Episode } from "episode";
import { LikedEpisodes } from "liked-episodes";

export function Router() {
  const { profile } = useProfile();

  return (
    <>
      {!profile && !Storage.getItem("accessToken") ? (
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={UserProfilePage} />
          <Route path="/home" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route path="/search/songs/:id" component={Songs} />
          <Route path="/search/artists/:id" component={ArtistsFromSearch} />
          <Route
            path="/playlist/:id"
            render={() => <Playlist key={uniqueId()} />}
          />
          <Route
            path="/album/:id" render={() => <Album key={uniqueId()} />}
          />
          <Route
            exact
            path="/artists/:id"
            render={() => <Artist key={uniqueId()} />}
          />
          <Route
            exact
            path="/artists/discography/:id/"
            component={Discography}
          />
          <Route exact path="/genre/:id" component={GenreDetails} />
          <Route path="/genre/playlist/:id/" exact component={MorePlaylists} />
          <Route path="/collection/tracks" component={LikedSongs} />
          <Route path="/collection/episodes" component={LikedEpisodes} />
          <Route path="/collection/playlists" component={Playlists} />
          <Route path="/collection/artists" component={Artists} />
          <Route path="/collection/albums" component={Albums} />
          <Route path="/collection/podcasts" component={Podcasts} />
          <Route path="/show/:id" component={Podcast} />
          <Route path="/episode/:id" component={Episode} />
        </Switch>
      )}
    </>
  );
}
