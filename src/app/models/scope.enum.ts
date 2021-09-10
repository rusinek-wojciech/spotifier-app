/**
 * Authorization scopes enum
 * https://developer.spotify.com/documentation/general/guides/scopes/
 * @enum {string}
 * @version 22.08.2021
 * @author ikinsure
 */
export enum Scope {
  /** Write access to user-provided images. */
  UGC_IMAGE_UPLOAD = 'ugc-image-upload',

  /** Write access to a user's private playlists. */
  PLAYLIST_MODIFY_PRIVATE = 'playlist-modify-private',

  /** Read access to user's private playlists. */
  PLAYLIST_READ_PRIVATE = 'playlist-read-private',

  /** Write access to a user's public playlists. */
  PLAYLIST_MODIFY_PUBLIC = 'playlist-modify-public',

  /** Include collaborative playlists when requesting a user's playlists. */
  PLAYLIST_READ_COLLABORATIVE = 'playlist-read-collaborative',

  /** Read access to user’s subscription details (type of user account). */
  USER_READ_PRIVATE = 'user-read-private',

  /** Read access to user’s email address. */
  USER_READ_EMAIL = 'user-read-email',

  /** Read access to a user’s player state. */
  USER_READ_PLAYBACK_STATE = 'user-read-playback-state',

  /** Write access to a user’s playback state */
  USER_MODIFY_PLAYBACK_STATE = 'user-modify-playback-state',

  /** Read access to a user’s currently playing content. */
  USER_READ_CURRENTLY_PLAYING = 'user-read-currently-playing',

  /** Write/delete access to a user's "Your Music" library. */
  USER_LIBRARY_MODIFY = 'user-library-modify',

  /** Read access to a user's library. */
  USER_LIBRARY_READ = 'user-library-read',

  /** Read access to a user’s playback position in a content. */
  USER_READ_PLAYBACK_POSITION = 'user-read-playback-position',

  /** Read access to a user’s recently played tracks. */
  USER_READ_RECENTLY_PLAYED = 'user-read-recently-played',

  /** Read access to a user's top artists and tracks. */
  USER_TOP_READ = 'user-top-read',

  /** Remote control playback of Spotify. This scope is currently available to Spotify iOS and Android SDKs. */
  APP_REMOTE_CONTROL = 'app-remote-control',

  /** Control playback of a Spotify track. This scope is currently available to the Web Playback SDK. The user must have a Spotify Premium account. */
  STREAMING = 'streaming',

  /** Write/delete access to the list of artists and other users that the user follows. */
  USER_FOLLOW_MODIFY = 'user-follow-modify',

  /** Read access to the list of artists and other users that the user follows. */
  USER_FOLLOW_READ = 'user-follow-read',
}
