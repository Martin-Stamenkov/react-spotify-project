import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  getUserAccount,
  getUserFollowedArtists,
  getListOfCurrentUserPlaylists,
  getCurrentUserSavedAlbums,
  getCurrentUserSavedShows,
  getTheUserCurrentPlayback,
  getUserEpisodes,
} from "../api";
import { GetLikedSongs } from "liked-songs";

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [userAlbums, setUserAlbums] = useState(null);
  const [userShows, setUserShows] = useState(null);
  const [userEpisodes, setUserEpisodes] = useState(null);
  const [userOwnPlaylist, setUserOwnPlaylist] = useState(null);
  const [userCurrentPlayback, setUserCurrentPlayback] = useState(null);
  const [userSavedTracks, setUserSavedTracks] = useState(null);

  const setPlaylists = useCallback((playlists) => {
    setUserPlaylists(playlists);
  }, []);

  const setOwnPlaylist = useCallback((playlist) => {
    setUserOwnPlaylist(playlist);
  }, []);

  const setFollowed = useCallback((artists) => {
    setFollowedArtists(artists);
  }, []);

  const setLikedSongs = useCallback((tracks) => {
    setUserSavedTracks(tracks);
  }, []);

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

  useEffect(() => {
    async function UserAlbums() {
      const albums = await getCurrentUserSavedAlbums();
      setUserAlbums(albums);
    }
    UserAlbums();
  }, []);

  useEffect(() => {
    async function UserShows() {
      const shows = await getCurrentUserSavedShows();
      setUserShows(shows);
    }
    UserShows();
  }, []);

  useEffect(() => {
    async function UserEpisodes() {
      const episodes = await getUserEpisodes();
      setUserEpisodes(episodes);
    }
    UserEpisodes();
  }, []);

  useEffect(() => {
    async function GetUserCurrentPlayback() {
      const response = await getTheUserCurrentPlayback();
      setUserCurrentPlayback(response);
    }
    GetUserCurrentPlayback();
  }, []);

  useEffect(() => {
    async function GetUserSavedTracks() {
      const response = await GetLikedSongs();
      setUserSavedTracks(response);
    }
    GetUserSavedTracks();
  }, []);

  const value = useMemo(
    () => ({
      followedArtists,
      profile,
      userPlaylists,
      userAlbums,
      userShows,
      setPlaylists,
      setFollowed,
      setOwnPlaylist,
      setLikedSongs,
      userOwnPlaylist,
      userCurrentPlayback,
      userEpisodes,
      userSavedTracks,
    }),
    [
      profile,
      followedArtists,
      userPlaylists,
      userAlbums,
      userShows,
      setPlaylists,
      setFollowed,
      setOwnPlaylist,
      setLikedSongs,
      userOwnPlaylist,
      userCurrentPlayback,
      userEpisodes,
      userSavedTracks,
    ]
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
