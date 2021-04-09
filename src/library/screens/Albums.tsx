import { Grid } from "@material-ui/core";
import { CardContainer, CardMedia, Spacer } from "components-lib";
import { FollowYourFirst } from "../components";
import React from "react";
import { useProfile } from "user";

interface IUserAlbums {
  album: {
    id: string;
    images: { url: string }[];
    name: string;
    description: string;
    artists: { name: string }[];
  };
}

export function Albums() {
  const { userAlbums } = useProfile();

  return (
    <>
      {userAlbums && userAlbums.items.length === 0 ? (
        <FollowYourFirst
          title="Follow your first album"
          description="Save albums by tapping the heart icon."
          buttonTitle="Find Albums"
        />
      ) : (
        <>
          <CardContainer title="Albums">
            {userAlbums &&
              userAlbums.items.map((userAlbum: IUserAlbums, index: number) => (
                <Grid item key={index}>
                  <CardMedia
                    id={userAlbum.album.id}
                    path={`/album/${userAlbum.album.id}`}
                    image={userAlbum.album.images[0].url}
                    name={userAlbum.album.name}
                    description={userAlbum.album.artists.map(
                      (artist: { name: string }) => artist.name
                    )}
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
