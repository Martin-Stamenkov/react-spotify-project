import React, { useEffect } from "react";
import { followArtist, getArtist } from "./api/requests";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { About, Spacer, Spinner, Button } from "components-lib";
import { RelatedArtists, Albums } from "./components";
import { TopTracks } from "./components/top-tracks/TopTracks";
import { useProfile } from "user";
import { useSnackbar } from "notistack";
import  avatar from "assets/avatar.png" 

export function Artist() {
  const { id }: { id: string } = useParams();

  const { data, status } = useQuery("artist", async () => await getArtist(id));
  const { followedArtists } = useProfile();
  const { enqueueSnackbar } = useSnackbar();
  const artistIsFollowed =
    followedArtists && followedArtists.items.find((x: any) => x.id === id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <About
            type={data.type}
            name={data.name}
            avatar={data.images.length > 0 ?  data.images[0].url : avatar}
            description={`Genres: ${data.genres
              .map((x: string) => x)
              .join(", ")}`}
            additionalInfo={`Followers: ${data.followers.total}`}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button.Play width={60} height={60} position="inherit" />
            <Spacer width={20} />
            <Button.Primary
              onClick={() => {
                followArtist(id);
                enqueueSnackbar(
                  !artistIsFollowed
                    ? "Saved to your library"
                    : "Removed from your library",
                  { variant: "info" }
                );
              }}
            >
              {!artistIsFollowed ? "Follow" : "Unfollow"}
            </Button.Primary>
          </div>
          <Spacer height={60} />
          <TopTracks />
          <Albums />
          <RelatedArtists />
          <Spacer height={150} />
        </>
      )}
    </>
  );
}
