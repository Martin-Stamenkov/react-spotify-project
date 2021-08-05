import React, { useEffect, useState } from "react";
import { followArtist, getArtist, unfollowArtist } from "./api/requests";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { About, Spacer, Spinner, Button, ErrorPrompt } from "components-lib";
import { RelatedArtists, Albums } from "./components";
import { TopTracks } from "./components/top-tracks/TopTracks";
import { useProfile } from "user";
import { useSnackbar } from "notistack";
import avatar from "assets/avatar.png"
import { getUserFollowedArtists } from "user/api";
import { checkIfUserFollowArtist } from "user/api/requests";

export function Artist() {
  const { id }: { id: string } = useParams();

  const { data, status } = useQuery("artist", async () => await getArtist(id));
  const { setFollowed } = useProfile();
  const { enqueueSnackbar } = useSnackbar();
  const [isFollowed, setIsFollowed] = useState(checkIfUserFollowArtist(id))


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    async function CheckIsFollowed() {
      const response = await checkIfUserFollowArtist(id)
      setIsFollowed(response)
    }
    CheckIsFollowed()
  }, [id]);

  const handleClick = async () => {
    if (await isFollowed) {
      unfollowArtist(id)
    } else {
      followArtist(id);
    }
    const artists = await getUserFollowedArtists();
    setFollowed(artists)
    enqueueSnackbar(
      !isFollowed
        ? "Saved to your library"
        : "Removed from your library",
      { variant: "info" }
    );
  }

  if (status === "error") {
    return (<ErrorPrompt />)
  }

  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <About
            type={data.type}
            name={data.name}
            avatar={data.images.length > 0 ? data.images[0].url : avatar}
            description={`Genres: ${data.genres
              .map((x: string) => x)
              .join(", ")}`}
            additionalInfo={`Followers: ${data.followers.total}`}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button.Play width={60} height={60} position="inherit" />
            <Spacer width={20} />
            <Button.Primary
              onClick={handleClick}
            >
              {!isFollowed ? "Follow" : "Unfollow"}
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
