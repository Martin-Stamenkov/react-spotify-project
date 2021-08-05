import { About, Spacer, Table } from "components-lib";
import React from "react";
import likedEpisodes from "assets/streaming.png";
import { Colors } from "styles";
import { useProfile } from "user";
import { Episode } from "episode";

interface IEpisode {
  episode: {
    id: number
    images: { url: string }[];
    name: string;
    description: string;
    release_date: string;
    duration_ms: number;
  }
}

export function LikedEpisodes() {

  const { profile, userSavedEpisodes } = useProfile();

  return (
    profile && userSavedEpisodes &&
    <>
      <About
        backgroundColor={Colors.SecondaryGreen}
        name="Liked Episodes"
        type="playlist"
        avatar={likedEpisodes}
        additionalInfo={`${profile.display_name} \n\u2022 ${userSavedEpisodes.total} ${userSavedEpisodes.total > 1 ? "episodes" : "episode"
          }`}
        infoAvatar={profile.images[0].url}
        avatarBorderRadius={{ borderRadius: 5 }}
      />
      <Table.Container withHeader={false}>
        {userSavedEpisodes &&
          userSavedEpisodes.items.map((e: IEpisode, index: number) => (
            <Episode id={e.episode.id.toString()}
              description={e.episode.description}
              duration_ms={e.episode.duration_ms}
              images={e.episode.images[1].url}
              name={e.episode.name}
              release_date={e.episode.release_date}
              key={index} />
          ))}
      </Table.Container>
      <Spacer height={100} />
    </>
  );
}
