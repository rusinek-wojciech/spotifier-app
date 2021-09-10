import { Scope } from '../app/models/index';

export const clientId = '6e70a3870fbe4d4bae4982467b032a2f';
export const clientSecret = 'e33d938dc8054daa860dbceedae30f19';
export const redirectUri = 'http://localhost:4200/callback';
export const scopes = [
  Scope.UGC_IMAGE_UPLOAD,
  Scope.PLAYLIST_MODIFY_PRIVATE,
  Scope.PLAYLIST_READ_PRIVATE,
  Scope.PLAYLIST_MODIFY_PUBLIC,
  Scope.PLAYLIST_READ_COLLABORATIVE,
  Scope.USER_READ_PRIVATE,
  Scope.USER_READ_EMAIL,
  Scope.USER_READ_PLAYBACK_STATE,
  Scope.USER_MODIFY_PLAYBACK_STATE,
  Scope.USER_READ_CURRENTLY_PLAYING,
  Scope.USER_LIBRARY_MODIFY,
  Scope.USER_LIBRARY_READ,
  Scope.USER_READ_PLAYBACK_POSITION,
  Scope.USER_READ_RECENTLY_PLAYED,
  Scope.USER_TOP_READ,
  Scope.APP_REMOTE_CONTROL,
  Scope.STREAMING,
  Scope.USER_FOLLOW_MODIFY,
  Scope.USER_FOLLOW_READ,
].join(' ');
