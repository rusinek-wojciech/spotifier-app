import { HttpHeaders } from '@angular/common/http';
import { Scope } from '@app/shared/types';
import { environment } from 'src/environments/environment';

const SPOTIFY_SCOPES = [
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
];

export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com';

export const SPOTIFY_AUTH_URL_TOKEN = `${SPOTIFY_AUTH_URL}/api/token`;

export const SPOTIFY_AUTH_URL_LINK = `${SPOTIFY_AUTH_URL}/authorize?${new URLSearchParams(
  [
    ['response_type', 'code'],
    ['client_id', environment.clientId],
    ['scope', SPOTIFY_SCOPES.join(' ')],
    ['redirect_uri', environment.redirectUri],
  ]
).toString()}`;

export const SPOTIFY_AUTH_URL_TOKEN_BODY = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${btoa(
      `${environment.clientId}:${environment.clientSecret}`
    )}`,
  }),
};
