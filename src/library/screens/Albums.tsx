import { Grid, makeStyles } from "@material-ui/core";
import { CardContainer, CardMedia, Spacer, Typography } from "components-lib";
import React from "react";
import { Colors } from "styles";
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

const useStyles = makeStyles(() => ({
  followAlbumInfo: {
    fontSize: 34,
    color: Colors.White,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20%",
  },
}));

export function Albums() {
  const { userAlbums } = useProfile();
  const classes = useStyles();

  return (
    <>
      {userAlbums && userAlbums.items.length === 0 ? (
        <Grid className={classes.infoContainer}>
          <Typography className={classes.followAlbumInfo}>
            Follow your first album
          </Typography>
          <Typography customStyle={{fontSize: 16}} className={classes.followAlbumInfo}>
            Save albums by tapping the heart icon.
          </Typography>
        </Grid>
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
