import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { getUserAccount, getUserFollowedArtists } from "../api/requests";

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);

  useEffect(() => {
    async function userData() {
      const user = await getUserAccount();
      setProfile(user);
    }
    userData();
  }, []);

  useEffect(() => {
    async function UserFollowedData() {
      const artists = await getUserFollowedArtists();
      setFollowedArtists(artists);
    }
    UserFollowedData();
  }, []);

  const value = useMemo(
    () => ({
      followedArtists,
      profile,
    }),
    [profile, followedArtists]
  );
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const profileContext = useContext(ProfileContext);

  if (!profileContext) {
    throw new Error('ProfileContext must be in scope when using "useProfile"');
  }

  return profileContext;
}
