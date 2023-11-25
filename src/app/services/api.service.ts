import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SpotifyApi } from '../models';

type Params =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static readonly ROOT = 'https://api.spotify.com';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private options(params?: Params) {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.token!.accessToken}`,
        'Content-Type': 'application/json',
      }),
      params,
    };
  }

  private get$<T = unknown>(uri: string, params?: Params) {
    return this.http.get<T>(`${ApiService.ROOT}/${uri}`, this.options(params));
  }

  private put$<T = unknown>(uri: string, body: unknown, params?: Params) {
    return this.http.put<T>(
      `${ApiService.ROOT}/${uri}`,
      body,
      this.options(params)
    );
  }

  private post$<T = unknown>(uri: string, body: unknown, params?: Params) {
    return this.http.post<T>(
      `${ApiService.ROOT}/${uri}`,
      body,
      this.options(params)
    );
  }

  private delete$<T = unknown>(uri: string, params?: Params) {
    return this.http.delete<T>(
      `${ApiService.ROOT}/${uri}`,
      this.options(params)
    );
  }

  ////////////////// Albums API ////////////////////////////////

  getAlbums$(params: { ids: string; market?: string }) {
    return this.get$(`v1/albums`, params);
  }

  getAlbum$(id: string, params?: { market?: string }) {
    return this.get$(`v1/albums/${id}`, params);
  }

  getAlbumTracks$(
    id: string,
    params?: { market?: string; limit?: number; offset?: number }
  ) {
    return this.get$(`v1/albums/${id}/tracks`, params);
  }

  ////////////////// Artists API ////////////////////////////////

  getArtists$(params: { ids: string }) {
    return this.get$(`v1/artists`, params);
  }

  getArtist$(id: string) {
    return this.get$(`v1/artists/${id}`);
  }

  getArtistTopTracks$(id: string, params: { market: string }) {
    return this.get$(`v1/artists/${id}/top-tracks`, params);
  }

  getArtistRelatedArtists$(id: string) {
    return this.get$(`v1/artists/${id}/related-artists`);
  }

  getArtistAlbums$(
    id: string,
    params?: {
      include_groups?: string;
      market?: string;
      limit?: number;
      offset?: number;
    }
  ) {
    return this.get$(`v1/artists/${id}/albums`, params);
  }

  ////////////////// Browse API ////////////////////////////////

  getNewReleases$(params?: {
    country?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.get$(`v1/browse/new-releases`, params);
  }

  getFeaturedPlaylists$(params?: {
    country?: string;
    locale?: string;
    timestamp?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.get$(`v1/browse/featured-playlists`, params);
  }

  getCategories$(params?: {
    country?: string;
    locale?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.get$(`v1/browse/categories`, params);
  }

  getCategory$(
    id: string,
    params?: {
      country?: string;
      locale?: string;
    }
  ) {
    return this.get$(`v1/browse/categories/${id}`, params);
  }

  getCategoryPlaylists$(
    id: string,
    params?: {
      country?: string;
      limit?: number;
      offset?: number;
    }
  ) {
    return this.get$(`v1/browse/categories/${id}/playlists`, params);
  }

  getRecommendations$(params: SpotifyApi.RecommendationsOptionsObject) {
    return this.get$<SpotifyApi.RecommendationsFromSeedsResponse>(
      `v1/recommendations`,
      params as any
    );
  }

  getRecommendationGenres$() {
    return this.get$(`v1/recommendations/available-genre-seeds`);
  }

  ////////////////// Episodes API ////////////////////////////////

  getEpisodes$(params: { ids: string; market?: string }) {
    return this.get$(`v1/episodes`, params);
  }

  getEpisode$(id: string, params?: { market?: string }) {
    return this.get$(`v1/episodes/${id}`, params);
  }

  ////////////////// Follow API ////////////////////////////////

  followPlaylist$(
    id: string,
    body?: {
      public?: boolean;
    }
  ) {
    return this.put$(`v1/playlists/${id}/followers`, body);
  }

  unfollowPlaylist$(id: string) {
    return this.delete$(`v1/playlists/${id}/followers`);
  }

  checkIfUsersFollowPlaylist$(
    playlistId: string,
    params: {
      ids: string;
    }
  ) {
    return this.get$(`v1/playlists/${playlistId}/followers/contains`, params);
  }

  getUserFollowedArtists$(params?: { after?: string; limit?: number }) {
    return this.get$(`v1/me/following`, {
      ...params,
      type: 'artist',
    });
  }

  followArtistsOrUsers$(params: { type: string; ids: string }) {
    return this.put$(`v1/me/following`, {}, params);
  }

  unfollowArtistsOrUsers$(params: { type: 'artist' | 'user'; ids: string }) {
    return this.delete$(`v1/me/following`, params);
  }

  getFollowingState$(params: { type: 'artist' | 'user'; ids: string }) {
    return this.get$(`v1/me/following/contains`, params);
  }

  ////////////////// Library API ////////////////////////////////

  getUserSavedAlbums$(params?: {
    limit?: number;
    offset?: number;
    market?: string;
  }) {
    return this.get$(`v1/me/albums`, params);
  }

  saveAlbumsForUser$(params: { ids: string }) {
    return this.put$(`v1/me/albums`, {}, params);
  }

  removeAlbumsForUser$(params: { ids: string }) {
    return this.delete$(`v1/me/albums`, params);
  }

  checkUserSavedAlbums$(params: { ids: string }) {
    return this.get$(`v1/me/albums/contains`, params);
  }

  getUserSavedTracks$(params?: {
    market?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.get$(`v1/me/tracks`, params);
  }

  saveTrackForUser$(params: { ids: string }) {
    return this.put$(`v1/me/tracks`, {}, params);
  }

  removeUserSavedTracks$(params: { ids: string }) {
    return this.delete$(`v1/me/tracks`, params);
  }

  checkUserSavedTracks$(params: { ids: string }) {
    return this.get$(`v1/me/tracks/contains`, params);
  }

  getUserSavedEpisodes$(params?: {
    market?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.get$(`v1/me/episodes`, params);
  }

  saveEpisodesForUser$(params: { ids: string }) {
    return this.put$(`v1/me/episodes`, {}, params);
  }

  removeUserSavedEpisodes$(params: { ids: string }) {
    return this.delete$(`v1/me/episodes`, params);
  }

  checkUserSavedEpisodes$(params: { ids: string }) {
    return this.get$(`v1/me/episodes/contains`, params);
  }

  getUserSavedShows$(params?: { limit?: number; offset?: number }) {
    return this.get$(`v1/me/shows`, params);
  }

  saveShowsForUser$(params: { ids: string }) {
    return this.put$(`v1/me/shows`, {}, params);
  }

  removeUserSavedShows$(params: { ids: string; market?: string }) {
    return this.delete$(`v1/me/shows`, params);
  }

  checkUserSavedShows$(params: { ids: string }) {
    return this.get$(`v1/me/shows/contains`, params);
  }

  ////////////////// Markets API ////////////////////////////////

  getAvailableMarkets$() {
    return this.get$(`v1/markets`);
  }

  ////////////////// Personalization API ////////////////////////////////

  getUserTopArtists$(params?: {
    time_range?: string;
    limit?: string;
    offset?: string;
  }) {
    return this.get$(`v1/me/top/artists`, params);
  }

  getUserTopTracks$(params?: {
    time_range?: string;
    limit?: string;
    offset?: string;
  }) {
    return this.get$(`v1/me/top/tracks`, params);
  }

  ////////////////// Player API ////////////////////////////////

  getInformationAboutUserCurrentPlayback$(params?: {
    market?: string;
    additional_types?: string;
  }) {
    return this.get$(`v1/me/player`, params);
  }

  transferUserPlayback$(body: { device_ids: string; play?: boolean }) {
    return this.put$(`v1/me/player`, body);
  }

  getUserAvailableDevices$() {
    return this.get$(`v1/me/player/devices`);
  }

  getUserCurrentlyPlayingTrack$(params: {
    market: string;
    additional_types?: string;
  }) {
    return this.get$(`v1/me/player/currently-playing`, params);
  }

  startOrResumeUserPlayback$(
    params?: {
      device_id?: string;
    },
    body?: {
      context_uri?: string;
      uris?: string[];
      offset?: {
        position: number;
      };
      position_ms: number;
    }
  ) {
    return this.put$(`v1/me/player/play`, body, params);
  }

  pauseUserPlayback$(params?: { device_id?: string }) {
    return this.put$(`v1/me/player/pause`, {}, params);
  }

  skipUserPlaybackToNextTrack$(params?: { device_id?: string }) {
    return this.post$(`v1/me/player/next`, {}, params);
  }

  skipUserPlaybackToPreviousTrack$(params?: { device_id?: string }) {
    return this.post$(`v1/me/player/previous`, {}, params);
  }

  seekToPositionInCurrentlyPlayingTrack$(params: {
    position_ms: number;
    device_id?: string;
  }) {
    return this.put$(`v1/me/player/seek`, {}, params);
  }

  setRepeatModeOnUserPlayback$(params: { state: string; device_id?: string }) {
    return this.put$(`v1/me/player/repeat`, {}, params);
  }

  setVolumeForUserPlayback$(params: {
    volume_percent: number;
    device_id?: string;
  }) {
    return this.put$(`v1/me/player/volume`, {}, params);
  }

  toggleShuffleForUserPlayback$(params: {
    state: boolean;
    device_id?: string;
  }) {
    return this.put$(`v1/me/player/shuffle`, {}, params);
  }

  getUserRecentlyPlayedTracks$(params?: {
    limit?: number;
    after?: number;
    before?: number;
  }) {
    return this.get$(`v1/me/player/recently-played`, params);
  }

  addItemToQueue$(params: { uri: string; device_id?: string }) {
    return this.post$(`v1/me/player/queue`, {}, params);
  }

  ////////////////// Playlists API ////////////////////////////////

  getListOfCurrentUserPlaylists$(params?: { limit?: number; offset?: number }) {
    return this.get$<SpotifyApi.ListOfUsersPlaylistsResponse>(
      `v1/me/playlists`,
      params
    );
  }

  getListOfUserPlaylists$(
    id: string,
    params?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return this.get$(`v1/users/${id}/playlists`, params);
  }

  createPlaylist$(
    id: string,
    params: {
      name: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    }
  ) {
    return this.post$(`v1/users/${id}/playlists`, {}, params);
  }

  /**
   * Get a Playlist
   */
  getPlaylist$(
    id: string,
    params?: { market?: string; fields?: string; additional_types?: string }
  ) {
    return this.get$<SpotifyApi.PlaylistTrackResponse>(
      `v1/playlists/${id}`,
      params
    );
  }

  changePlaylistDetails$(
    id: string,
    body?: {
      name?: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    }
  ) {
    return this.put$(`v1/playlists/${id}`, body);
  }

  getPlaylistItems$(
    id: string,
    params?: {
      market?: string;
      fields?: string;
      limit?: number;
      offset?: number;
      additional_types?: string;
    }
  ) {
    return this.get$<SpotifyApi.PlaylistTrackResponse>(
      `v1/playlists/${id}/tracks`,
      params
    );
  }

  addItemsToPlaylist$(
    id: string,
    body: { uris?: string; position?: number },
    params?: { position?: number; uris?: string }
  ) {
    return this.post$(`v1/playlists/${id}/tracks`, body, params);
  }

  reorderOrReplacePlaylistItems$(
    id: string,
    body?: {
      uris?: string;
      range_start?: number;
      insert_before?: number;
      range_length?: number;
      snapshot_id?: string;
    },
    params?: { uris?: string }
  ) {
    return this.put$(`v1/playlists/${id}/tracks`, body, params);
  }

  removeItemsFromPlaylist$(
    id: string,
    body: {
      tracks: string[];
      snapshot_id?: string;
    }
  ) {
    const options = this.options();
    return this.delete$(`v1/playlists/${id}/tracks`, {
      // headers: options.headers,
      // body,
    });
  }

  getPlaylistCoverImage$(id: string) {
    return this.get$(`v1/playlists/${id}/images`);
  }

  uploadCustomPlaylistCoverImage$(id: string) {
    // const options = this.options();
    // if (options.headers) {
    //    options.headers.set('Content-Type', 'image/jpeg');
    // }
    return this.put$(`v1/playlists/${id}/images`, {});
  }

  ////////////////// Search API ////////////////////////////////

  searchAlbum$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.get$(`v1/search`, {
      type: 'album',
      ...params,
    });
  }

  searchArtist$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.get$(`v1/search`, {
      type: 'artist',
      ...params,
    });
  }

  searchPlaylist$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.get$(`v1/search`, {
      type: 'playlist',
      ...params,
    });
  }

  searchTrack$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.get$(`v1/search`, {
      type: 'track',
      ...params,
    });
  }

  searchShow$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.get$(`v1/search`, {
      type: 'show',
      ...params,
    });
  }

  searchEpisode$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.get$(`v1/search`, {
      type: 'episode',
      ...params,
    });
  }

  ////////////////// Shows API ////////////////////////////////

  getShows$(params: { ids: string; market?: string }) {
    return this.get$(`v1/shows`, params);
  }

  getShow$(
    id: string,
    params?: {
      market?: string;
    }
  ) {
    return this.get$(`v1/shows/${id}`, params);
  }

  getShowEpisodes$(
    id: string,
    params?: {
      market?: string;
    }
  ) {
    return this.get$(`v1/shows/${id}/episodes`, params);
  }

  ////////////////// Tracks API ////////////////////////////////

  getTracks$(params: { ids: string; market?: string }) {
    return this.get$(`v1/tracks`, params);
  }

  getTrack$(id: string, params?: { market?: string }) {
    return this.get$(`v1/tracks/${id}`, params);
  }

  getAudioFeaturesForTracks$(params: { ids: string }) {
    return this.get$(`v1/audio-features`, params);
  }

  getAudioFeaturesForTrack$(id: string) {
    return this.get$(`v1/audio-features/${id}`);
  }

  getAudioAnalysisForTrack$(id: string) {
    return this.get$(`v1/audio-analysis/${id}`);
  }

  getCurrentUserProfile$() {
    return this.get$<SpotifyApi.CurrentUsersProfileResponse>(`v1/me`);
  }

  getUserProfile$(id: string) {
    return this.get$(`v1/users/${id}`);
  }
}
