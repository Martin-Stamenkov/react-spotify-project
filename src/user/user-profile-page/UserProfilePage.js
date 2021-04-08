import React from "react";
import avatar from "assets/avatar.png";
import LinkIcon from "@material-ui/icons/Link";
import { useStyles } from "./user-profile-page.styles";
import { useProfile } from "../provider/ProfileProvider";
import {
  Button,
  Typography,
  CardMedia,
  Spacer,
  CardContainer,
  About,
} from "components-lib";
import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";

export const UserProfilePage = () => {
  const { profile, followedArtists } = useProfile();
  const { enqueueSnackbar } = useSnackbar();

  const copyUrl = (variant) => {
    navigator.clipboard.writeText("http://localhost:3000/profile");
    enqueueSnackbar("Copied link to the clipboard!", { variant });
  };

  const classes = useStyles();
  return (
    profile && (
      <>
        <About
          type="profile"
          avatar={profile.images.length ? profile.images[0].url : avatar}
          name={profile.display_name}
          additionalInfo={`${profile.followers.total} Followers`}
        />
        <Button.Icon
          className={classes.copyButton}
          onClick={() => copyUrl("info")}
        >
          <LinkIcon />
          <Spacer width={5} />
          <Typography className={classes.copyButtonText}>
            Copy Link to profile
          </Typography>
        </Button.Icon>
        <CardContainer title="Following">
          {followedArtists &&
            followedArtists.items.map((artist) => (
              <Grid key={artist.id} item>
                <CardMedia
                  path={`/artists/${artist.id}`}
                  withFlex={false}
                  withCircleAvatar
                  id={artist.id}
                  type={artist.type}
                  name={artist.name}
                  description={artist.type}
                  image={artist.images[0].url}
                  height={275}
                />
              </Grid>
            ))}
        </CardContainer>
        <Spacer height={150} />
      </>
    )
  );
};
