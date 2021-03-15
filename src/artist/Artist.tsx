import React from "react";
import { followArtist, getArtist } from "./api/requests";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { About, Spacer, Spinner, Button } from "components-lib";
import { RelatedArtists, Albums } from "./components";
import { TopTracks } from "./components/top-tracks/TopTracks";
import { useProfile } from "user";

export function Artist() {
  const { id }: { id: string } = useParams();

  const { data, status } = useQuery("artist", async () => await getArtist(id));
  const { followedArtists } = useProfile();
  const artistIsFollowed =
    followedArtists && followedArtists.items.find((x: any) => x.id === id);

  return (
    <>
      {!data && status === "loading" ? (
        <Spinner />
      ) : (
        <>
          <About
            type={data.type}
            name={data.name}
            avatar={data.images[0].url}
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