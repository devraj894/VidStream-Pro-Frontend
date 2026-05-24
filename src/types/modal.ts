import { Playlist } from "./playlist.types";
import { Tweet } from "./tweets.types";
import { StudioVideo } from "./videos.types";

export type ModalType =
  // VIDEO
  | { type: 'upload-video' }
  | { type: 'edit-video'; data: StudioVideo }
  | { type: 'delete-video'; data: StudioVideo }

  // PLAYLIST
  | { type: 'upload-playlist' }
  | { type: 'edit-playlist'; data: Playlist }
  | { type: 'delete-playlist'; data: Playlist }

  // PLAYLIST VIDEOS
  | { type: 'add-video-to-playlist'; data: { playlistId: string } }
  | { type: 'remove-video-from-playlist'; data: { playlistId: string; videoId: string } }

  // TWEET
  | { type: 'upload-tweet' }
  | { type: 'edit-tweet'; data: Tweet }
  | { type: 'delete-tweet'; data: Tweet }