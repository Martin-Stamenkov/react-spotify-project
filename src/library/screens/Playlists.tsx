import { Grid } from "@material-ui/core";
import { CardContainer, CardMedia, Spacer } from "components-lib";
import React from "react";
import musicLogo from "assets/music_placeholder.png";
import { useProfile } from "user";
import { FollowYourFirst } from "../components";

interface IUserPlaylist {
  id: string;
  images: { url: string }[];
  name: string;
  description: string;
  owner: { display_name: string };
}

export function Playlists() {
  const { userPlaylists } = useProfile();

  return (
    <>
    {userPlaylists && userPlaylists.items.length === 0 ? (
      <FollowYourFirst
        title="Create your first playlist"
        description="Create your first playlist"
        buttonTitle="Create Playlist"
      />
    ) : (
    <>
      <CardContainer title="Playlist">
        {userPlaylists &&
          userPlaylists.items.map(
            (userPlaylist: IUserPlaylist, index: number) => (
              <Grid item key={index}>
                <CardMedia
                  id={userPlaylist.id}
                  path={`/playlist/${userPlaylist.id}`}
                  image={
                    userPlaylist.images.length > 0
                      ? userPlaylist.images[0].url
                      : musicLogo
                  }
                  name={userPlaylist.name}
                  description={
                    userPlaylist.description === ""
                      ? `By ${userPlaylist.owner.display_name}`
                      : userPlaylist.description
                  }
                  withFlex={false}
                />
              </Grid>
            )
          )}
      </CardContainer>
      <Spacer height={150} />
    </>
  )};
  </>
  )
}
