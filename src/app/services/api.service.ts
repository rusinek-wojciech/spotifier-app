import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

type Params =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?: Params;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly root = 'https://api.spotify.com';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private options(params?: Params): Options {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken().accessToken,
        'Content-Type': 'application/json',
      }),
      params,
    };
  }

  ////////////////// Albums API ////////////////////////////////

  /**
   * Get Multiple Albums
   */
  getAlbums$(params: { ids: string; market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/albums`,
      this.options(params)
    );
  }

  /**
   * Get an Album
   */
  getAlbum$(id: string, params?: { market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/albums/${id}`,
      this.options(params)
    );
  }

  /**
   * Get an Album's Tracks
   */
  getAlbumTracks$(
    id: string,
    params?: { market?: string; limit?: number; offset?: number }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/albums/${id}/tracks`,
      this.options(params)
    );
  }

  ////////////////// Artists API ////////////////////////////////

  /**
   * Get Multiple Artists
   */
  getArtists$(params: { ids: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/artists`,
      this.options(params)
    );
  }

  /**
   * Get an Artist
   */
  getArtist$(id: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/artists/${id}`,
      this.options()
    );
  }

  /**
   * Get an Artist's Top Tracks
   */
  getArtistTopTracks$(
    id: string,
    params: { market: string }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/artists/${id}/top-tracks`,
      this.options(params)
    );
  }

  /**
   * Get an Artist's Related Artists
   */
  getArtistRelatedArtists$(id: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/artists/${id}/related-artists`,
      this.options()
    );
  }

  /**
   * Get an Artist's Albums
   */
  getArtistAlbums$(
    id: string,
    params?: {
      include_groups?: string;
      market?: string;
      limit?: number;
      offset?: number;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/artists/${id}/albums`,
      this.options(params)
    );
  }

  ////////////////// Browse API ////////////////////////////////

  /**
   * Get All New Releases
   */
  getNewReleases$(params?: {
    country?: string;
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/browse/new-releases`,
      this.options(params)
    );
  }

  /**
   * Get All Featured Playlists
   */
  getFeaturedPlaylists$(params?: {
    country?: string;
    locale?: string;
    timestamp?: string;
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/browse/featured-playlists`,
      this.options(params)
    );
  }

  /**
   * Get All Categories
   */
  getCategories$(params?: {
    country?: string;
    locale?: string;
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/browse/categories`,
      this.options(params)
    );
  }

  /**
   * Get a Category
   */
  getCategory$(
    id: string,
    params?: {
      country?: string;
      locale?: string;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/browse/categories/${id}`,
      this.options(params)
    );
  }

  /**
   * Get a Category's Playlists
   */
  getCategoryPlaylists$(
    id: string,
    params?: {
      country?: string;
      limit?: number;
      offset?: number;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/browse/categories/${id}/playlists`,
      this.options(params)
    );
  }

  /**
   * Get Recommendations
   */
  getRecommendations$(params: {
    limit?: number;
    market?: string;
    max_acousticness?: number;
    max_danceability?: number;
    max_duration_ms?: number;
    max_energy?: number;
    max_instrumentalness?: number;
    max_key?: number;
    max_liveness?: number;
    max_loudness?: number;
    max_mode?: number;
    max_popularity?: number;
    max_speechiness?: number;
    max_tempo?: number;
    max_time_signature?: number;
    max_valence?: number;
    min_acousticness?: number;
    min_danceability?: number;
    min_duration_ms?: number;
    min_energy?: number;
    min_instrumentalness?: number;
    min_key?: number;
    min_liveness?: number;
    min_loudness?: number;
    min_mode?: number;
    min_popularity?: number;
    min_speechiness?: number;
    min_tempo?: number;
    min_time_signature?: number;
    min_valence?: number;
    seed_artists: string;
    seed_genres: string;
    seed_tracks: string;
    target_acousticness?: number;
    target_danceability?: number;
    target_duration_ms?: number;
    target_energy?: number;
    target_instrumentalness?: number;
    target_key?: number;
    target_liveness?: number;
    target_loudness?: number;
    target_mode?: number;
    target_popularity?: number;
    target_speechiness?: number;
    target_tempo?: number;
    target_time_signature?: number;
    target_valence?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/recommendations`,
      this.options(params)
    );
  }

  /**
   * Get Recommendation Genres
   */
  getRecommendationGenres$(): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/recommendations/available-genre-seeds`,
      this.options()
    );
  }

  ////////////////// Episodes API ////////////////////////////////

  /**
   * Get Multiple Episodes
   */
  getEpisodes$(params: { ids: string; market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/episodes`,
      this.options(params)
    );
  }

  /**
   * Get an Episode
   */
  getEpisode$(id: string, params?: { market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/episodes/${id}`,
      this.options(params)
    );
  }

  ////////////////// Follow API ////////////////////////////////

  /**
   * Follow a Playlist
   */
  followPlaylist$(
    id: string,
    body?: {
      public?: boolean;
    }
  ): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/playlists/${id}/followers`,
      body,
      this.options()
    );
  }

  /**
   * Unfollow Playlist
   */
  unfollowPlaylist$(id: string): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.root}/v1/playlists/${id}/followers`,
      this.options()
    );
  }

  /**
   * Check if Users Follow a Playlist
   */
  checkIfUsersFollowPlaylist$(
    playlistId: string,
    params: {
      ids: string;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/playlists/${playlistId}/followers/contains`,
      this.options(params)
    );
  }

  /**
   * Get User's Followed Artists
   */
  getUserFollowedArtists$(params?: {
    after?: string;
    limit?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/following`,
      this.options({
        ...params,
        type: 'artist',
      })
    );
  }

  /**
   * Follow Artists or Users
   */
  followArtistsOrUsers$(params: {
    type: string;
    ids: string;
  }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/following`,
      {},
      this.options(params)
    );
  }

  /**
   * Unfollow Artists or Users
   */
  unfollowArtistsOrUsers$(params: {
    type: 'artist' | 'user';
    ids: string;
  }): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.root}/v1/me/following`,
      this.options(params)
    );
  }

  /**
   * Get Following State for Artists/Users
   */
  getFollowingState$(params: {
    type: 'artist' | 'user';
    ids: string;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/following/contains`,
      this.options(params)
    );
  }

  ////////////////// Library API ////////////////////////////////

  /**
   * Get User's Saved Albums
   */
  getUserSavedAlbums$(params?: {
    limit?: number;
    offset?: number;
    market?: string;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/albums`,
      this.options(params)
    );
  }

  /**
   * Save Albums for Current User
   */
  saveAlbumsForUser$(params: { ids: string }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/albums`,
      {},
      this.options(params)
    );
  }

  /**
   * Remove Albums for Current User
   */
  removeAlbumsForUser$(params: { ids: string }): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.root}/v1/me/albums`,
      this.options(params)
    );
  }

  /**
   * Check User's Saved Albums
   */
  checkUserSavedAlbums$(params: { ids: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/albums/contains`,
      this.options(params)
    );
  }

  /**
   * Get User's Saved Tracks
   */
  getUserSavedTracks$(params?: {
    market?: string;
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/tracks`,
      this.options(params)
    );
  }

  /**
   * Save Tracks for User
   */
  saveTrackForUser$(params: { ids: string }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/tracks`,
      {},
      this.options(params)
    );
  }

  /**
   * Remove User's Saved Tracks
   */
  removeUserSavedTracks$(params: { ids: string }): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.root}/v1/me/tracks`,
      this.options(params)
    );
  }

  /**
   * Check User's Saved Tracks
   */
  checkUserSavedTracks$(params: { ids: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/tracks/contains`,
      this.options(params)
    );
  }

  /**
   * Get User's Saved Episodes
   */
  getUserSavedEpisodes$(params?: {
    market?: string;
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/episodes`,
      this.options(params)
    );
  }

  // TODO: fix void
  /**
   * Save Episodes for User
   */
  saveEpisodesForUser$(params: { ids: string }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/episodes`,
      {},
      this.options(params)
    );
  }

  // TODO: fix void
  /**
   * Remove User's Saved Episodes
   */
  removeUserSavedEpisodes$(params: { ids: string }): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.root}/v1/me/episodes`,
      this.options(params)
    );
  }

  // TODO: fix
  /**
   * Check User's Saved Episodes
   */
  checkUserSavedEpisodes$(params: { ids: string }): Observable<Array<boolean>> {
    return this.http.get<Array<boolean>>(
      `${this.root}/v1/me/episodes/contains`,
      this.options(params)
    );
  }

  /**
   * Get User's Saved Shows
   */
  getUserSavedShows$(params?: {
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/shows`,
      this.options(params)
    );
  }

  // TODO: fix
  /**
   * Save Shows for Current User
   */
  saveShowsForUser$(params: { ids: string }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/shows`,
      {},
      this.options(params)
    );
  }

  // TODO: fix
  /**
   * Remove User's Saved Shows
   */
  removeUserSavedShows$(params: {
    ids: string;
    market?: string;
  }): Observable<unknown> {
    return this.http.delete<unknown>(
      `${this.root}/v1/me/shows`,
      this.options(params)
    );
  }

  // TODO: fix
  /**
   * Check User's Saved Shows
   */
  checkUserSavedShows$(params: { ids: string }): Observable<Array<boolean>> {
    return this.http.get<Array<boolean>>(
      `${this.root}/v1/me/shows/contains`,
      this.options(params)
    );
  }

  ////////////////// Markets API ////////////////////////////////

  // TODO: add type
  /**
   * Get Available Markets
   */
  getAvailableMarkets$(): Observable<{ markets: string[] }> {
    return this.http.get<{ markets: string[] }>(
      `${this.root}/v1/markets`,
      this.options()
    );
  }

  ////////////////// Personalization API ////////////////////////////////

  /**
   * Get a User's Top Artists and Tracks
   */
  getUserTopArtists$(params?: {
    time_range?: string;
    limit?: string;
    offset?: string;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/top/artists`,
      this.options(params)
    );
  }

  /**
   * Get a User's Top Artists and Tracks
   */
  getUserTopTracks$(params?: {
    time_range?: string;
    limit?: string;
    offset?: string;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/top/tracks`,
      this.options(params)
    );
  }

  ////////////////// Player API ////////////////////////////////

  /**
   * Get Information About The User's Current Playback
   */
  getInformationAboutUserCurrentPlayback$(params?: {
    market?: string;
    additional_types?: string;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/player`,
      this.options(params)
    );
  }

  /**
   * Transfer a User's Playback
   */
  transferUserPlayback$(body: {
    device_ids: string;
    play?: boolean;
  }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player`,
      body,
      this.options()
    );
  }

  /**
   * Get a User's Available Devices
   */
  getUserAvailableDevices$(): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/player/devices`,
      this.options()
    );
  }

  /**
   * Get the User's Currently Playing Track
   */
  getUserCurrentlyPlayingTrack$(params: {
    market: string;
    additional_types?: string;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/player/currently-playing`,
      this.options(params)
    );
  }

  /**
   * Start/Resume a User's Playback
   */
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
  ): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player/play`,
      body,
      this.options(params)
    );
  }

  /**
   * Pause a User's Playback
   */
  pauseUserPlayback$(params?: { device_id?: string }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player/pause`,
      {},
      this.options(params)
    );
  }

  /**
   * Skip User’s Playback To Next Track
   */
  skipUserPlaybackToNextTrack$(params?: {
    device_id?: string;
  }): Observable<unknown> {
    return this.http.post<unknown>(
      `${this.root}/v1/me/player/next`,
      {},
      this.options(params)
    );
  }

  /**
   * Skip User’s Playback To Previous Track
   */
  skipUserPlaybackToPreviousTrack$(params?: {
    device_id?: string;
  }): Observable<unknown> {
    return this.http.post<unknown>(
      `${this.root}/v1/me/player/previous`,
      {},
      this.options(params)
    );
  }

  /**
   * Seek To Position In Currently Playing Track
   */
  seekToPositionInCurrentlyPlayingTrack$(params: {
    position_ms: number;
    device_id?: string;
  }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player/seek`,
      {},
      this.options(params)
    );
  }

  /**
   * Set Repeat Mode On User’s Playback
   */
  setRepeatModeOnUserPlayback$(params: {
    state: string;
    device_id?: string;
  }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player/repeat`,
      {},
      this.options(params)
    );
  }

  /**
   * Set Volume For User's Playback
   */
  setVolumeForUserPlayback$(params: {
    volume_percent: number;
    device_id?: string;
  }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player/volume`,
      {},
      this.options(params)
    );
  }

  /**
   * Toggle Shuffle For User’s Playback
   */
  toggleShuffleForUserPlayback$(params: {
    state: boolean;
    device_id?: string;
  }): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/me/player/shuffle`,
      {},
      this.options(params)
    );
  }

  /**
   * Get Current User's Recently Played Tracks
   */
  getUserRecentlyPlayedTracks$(params?: {
    limit?: number;
    after?: number;
    before?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/player/recently-played`,
      this.options(params)
    );
  }

  /**
   * Add an item to queue
   */
  addItemToQueue$(params: {
    uri: string;
    device_id?: string;
  }): Observable<unknown> {
    return this.http.post<unknown>(
      `${this.root}/v1/me/player/queue`,
      {},
      this.options(params)
    );
  }

  ////////////////// Playlists API ////////////////////////////////

  /**
   * Get a List of Current User's Playlists
   */
  getListOfCurrentUserPlaylists$(params?: {
    limit?: number;
    offset?: number;
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/me/playlists`,
      this.options(params)
    );
  }

  /**
   * Get a List of a User's Playlists
   */
  getListOfUserPlaylists$(
    id: string,
    params?: {
      limit?: number;
      offset?: number;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/users/${id}/playlists`,
      this.options(params)
    );
  }

  /**
   * Create a Playlist
   */
  createPlaylist$(
    id: string,
    params: {
      name: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    }
  ): Observable<unknown> {
    return this.http.post<unknown>(
      `${this.root}/v1/users/${id}/playlists`,
      {},
      this.options(params)
    );
  }

  /**
   * Get a Playlist
   */
  getPlaylist$(
    id: string,
    params?: { market?: string; fields?: string; additional_types?: string }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/playlists/${id}`,
      this.options(params)
    );
  }

  /**
   * Change a Playlist's Details
   */
  changePlaylistDetails$(
    id: string,
    body?: {
      name?: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    }
  ): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/playlists/${id}`,
      body,
      this.options()
    );
  }

  /**
   * Get a Playlist's Items
   */
  getPlaylistItems$(
    id: string,
    params?: {
      market?: string;
      fields?: string;
      limit?: number;
      offset?: number;
      additional_types?: string;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/playlists/${id}/tracks`,
      this.options(params)
    );
  }

  /**
   * Add Items to a Playlist
   */
  addItemsToPlaylist$(
    id: string,
    body?: { uris?: string; position?: number },
    params?: { position?: number; uris?: string }
  ): Observable<unknown> {
    return this.http.post<unknown>(
      `${this.root}/v1/playlists/${id}/tracks`,
      body,
      this.options(params)
    );
  }

  /**
   * Reorder or Replace a Playlist's Items
   */
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
  ): Observable<unknown> {
    return this.http.put<unknown>(
      `${this.root}/v1/playlists/${id}/tracks`,
      body,
      this.options(params)
    );
  }

  // TODO: fix tracks object
  /**
   * Remove Items from a Playlist
   */
  removeItemsFromPlaylist$(
    id: string,
    body: {
      tracks: string[];
      snapshot_id?: string;
    }
  ): Observable<unknown> {
    const options = this.options();
    return this.http.delete<unknown>(`${this.root}/v1/playlists/${id}/tracks`, {
      headers: options.headers,
      body,
    });
  }

  /**
   * Get a Playlist Cover Image
   */
  getPlaylistCoverImage$(id: string): Observable<unknown[]> {
    return this.http.get<unknown[]>(
      `${this.root}/v1/playlists/${id}/images`,
      this.options()
    );
  }

  // TODO: image
  /**
   * Upload a Custom Playlist Cover Image
   * @
   */
  uploadCustomPlaylistCoverImage$(id: string): Observable<unknown> {
    const options = this.options();
    if (options.headers) {
      // options.headers.set('Content-Type', 'image/jpeg');
    }
    return this.http.put<unknown>(
      `${this.root}/v1/playlists/${id}/images`,
      {},
      {
        headers: options.headers,
      }
    );
  }

  ////////////////// Search API ////////////////////////////////

  /**
   * Search for an Item - album
   */
  searchAlbum$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/search`,
      this.options({
        type: 'album',
        ...params,
      })
    );
  }

  /**
   * Search for an Item - artist
   */
  searchArtist$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/search`,
      this.options({
        type: 'artist',
        ...params,
      })
    );
  }

  /**
   * Search for an Item - playlist
   */
  searchPlaylist$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/search`,
      this.options({
        type: 'playlist',
        ...params,
      })
    );
  }

  /**
   * Search for an Item - track
   */
  searchTrack$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/search`,
      this.options({
        type: 'track',
        ...params,
      })
    );
  }

  /**
   * Search for an Item - show
   */
  searchShow$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/search`,
      this.options({
        type: 'show',
        ...params,
      })
    );
  }

  /**
   * Search for an Item - episode
   */
  searchEpisode$(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/search`,
      this.options({
        type: 'episode',
        ...params,
      })
    );
  }

  ////////////////// Shows API ////////////////////////////////

  /**
   * Get Multiple Shows
   */
  getShows$(params: { ids: string; market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/shows`,
      this.options(params)
    );
  }

  /**
   * Get a Show
   */
  getShow$(
    id: string,
    params?: {
      market?: string;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/shows/${id}`,
      this.options(params)
    );
  }

  /**
   * Get a Show's Episodes
   */
  getShowEpisodes$(
    id: string,
    params?: {
      market?: string;
    }
  ): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/shows/${id}/episodes`,
      this.options(params)
    );
  }

  ////////////////// Tracks API ////////////////////////////////

  /**
   * Get Several Tracks
   */
  getTracks$(params: { ids: string; market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/tracks`,
      this.options(params)
    );
  }

  /**
   * Get a Track
   */
  getTrack$(id: string, params?: { market?: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/tracks/${id}`,
      this.options(params)
    );
  }

  /**
   * Get Audio Features for Several Tracks
   */
  getAudioFeaturesForTracks$(params: { ids: string }): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/audio-features`,
      this.options(params)
    );
  }

  /**
   * Get Audio Features for a Track
   */
  getAudioFeaturesForTrack$(id: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/audio-features/${id}`,
      this.options()
    );
  }

  /**
   * Get Audio Analysis for a Track
   */
  getAudioAnalysisForTrack$(id: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/audio-analysis/${id}`,
      this.options()
    );
  }

  ////////////////// Users Profile API ////////////////////////////////

  /**
   * Get Current User's Profile
   */
  getCurrentUserProfile$(): Observable<unknown> {
    return this.http.get<unknown>(`${this.root}/v1/me`, this.options());
  }

  /**
   * Get a User's Profile
   */
  getUserProfile$(id: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${this.root}/v1/users/${id}`,
      this.options()
    );
  }
}
