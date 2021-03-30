import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import { getUserAccount, getUserFollowedArtists, getListOfCurrentUserPlaylists } from "../api";

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);


  useEffect(() => {
    async function UserData() {
      const user = await getUserAccount();
      setProfile(user);
    }
    UserData();
  }, []);

  useEffect(() => {
    async function UserFollowedData() {
      const artists = await getUserFollowedArtists();
      setFollowedArtists(artists);
    }
    UserFollowedData();
  }, []);

  useEffect(() => {
    async function UserPlaylists() {
      const data = await getListOfCurrentUserPlaylists();
      setUserPlaylists(data);
    }
    UserPlaylists();
  }, []);

  const value = useMemo(
    () => ({
      followedArtists,
      profile,
      userPlaylists
    }),
    [profile, followedArtists, userPlaylists]
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
