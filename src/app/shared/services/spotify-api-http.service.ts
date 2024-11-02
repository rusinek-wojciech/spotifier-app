import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyApiHttpService {
  private readonly root = 'https://api.spotify.com';
  private readonly http = inject(HttpClient);

  ////////////////// Albums API ////////////////////////////////

  getAlbums(params: { ids: string; market?: string }) {
    return this.http.get(`${this.root}/v1/albums`, { params });
  }

  getAlbum(id: string, params?: { market?: string }) {
    return this.http.get(`${this.root}/v1/albums/${id}`, { params });
  }

  getAlbumTracks(
    id: string,
    params?: { market?: string; limit?: number; offset?: number }
  ) {
    return this.http.get(`${this.root}/v1/albums/${id}/tracks`, { params });
  }

  ////////////////// Artists API ////////////////////////////////

  getArtists(params: { ids: string }) {
    return this.http.get(`${this.root}/v1/artists`, { params });
  }

  getArtist(id: string) {
    return this.http.get(`${this.root}/v1/artists/${id}`);
  }

  getArtistTopTracks(id: string, params: { market: string }) {
    return this.http.get(`${this.root}/v1/artists/${id}/top-tracks`, {
      params,
    });
  }

  getArtistRelatedArtists(id: string) {
    return this.http.get(`${this.root}/v1/artists/${id}/related-artists`);
  }

  getArtistAlbums(
    id: string,
    params?: {
      include_groups?: string;
      market?: string;
      limit?: number;
      offset?: number;
    }
  ) {
    return this.http.get(`${this.root}/v1/artists/${id}/albums`, { params });
  }

  ////////////////// Browse API ////////////////////////////////

  getNewReleases(params?: {
    country?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.http.get(`${this.root}/v1/browse/new-releases`, { params });
  }

  getFeaturedPlaylists(params?: {
    country?: string;
    locale?: string;
    timestamp?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.http.get(`${this.root}/v1/browse/featured-playlists`, {
      params,
    });
  }

  getCategories(params?: {
    country?: string;
    locale?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.http.get(`${this.root}/v1/browse/categories`, { params });
  }

  getCategory(
    id: string,
    params?: {
      country?: string;
      locale?: string;
    }
  ) {
    return this.http.get(`${this.root}/v1/browse/categories/${id}`, { params });
  }

  getCategoryPlaylists(
    id: string,
    params?: {
      country?: string;
      limit?: number;
      offset?: number;
    }
  ) {
    return this.http.get(`${this.root}/v1/browse/categories/${id}/playlists`, {
      params,
    });
  }

  getRecommendations(params: SpotifyApi.RecommendationsOptionsObject) {
    return this.http.get<SpotifyApi.RecommendationsFromSeedsResponse>(
      `${this.root}/v1/recommendations`,
      params as any
    );
  }

  getRecommendationGenres() {
    return this.http.get(
      `${this.root}/v1/recommendations/available-genre-seeds`
    );
  }

  ////////////////// Episodes API ////////////////////////////////

  getEpisodes(params: { ids: string; market?: string }) {
    return this.http.get(`${this.root}/v1/episodes`, { params });
  }

  getEpisode(id: string, params?: { market?: string }) {
    return this.http.get(`${this.root}/v1/episodes/${id}`, { params });
  }

  ////////////////// Follow API ////////////////////////////////

  followPlaylist(
    id: string,
    body?: {
      public?: boolean;
    }
  ) {
    return this.http.put(`${this.root}/v1/playlists/${id}/followers`, body);
  }

  unfollowPlaylist(id: string) {
    return this.http.delete(`${this.root}/v1/playlists/${id}/followers`);
  }

  checkIfUsersFollowPlaylist(
    playlistId: string,
    params: {
      ids: string;
    }
  ) {
    return this.http.get(
      `${this.root}/v1/playlists/${playlistId}/followers/contains`,
      { params }
    );
  }

  getUserFollowedArtists(params?: { after?: string; limit?: number }) {
    return this.http.get(`${this.root}/v1/me/following`, {
      params: {
        ...params,
        type: 'artist',
      },
    });
  }

  followArtistsOrUsers(params: { type: string; ids: string }) {
    return this.http.put(`${this.root}/v1/me/following`, {}, { params });
  }

  unfollowArtistsOrUsers(params: { type: 'artist' | 'user'; ids: string }) {
    return this.http.delete(`${this.root}/v1/me/following`, { params });
  }

  getFollowingState(params: { type: 'artist' | 'user'; ids: string }) {
    return this.http.get(`${this.root}/v1/me/following/contains`, { params });
  }

  ////////////////// Library API ////////////////////////////////

  getUserSavedAlbums(params?: {
    limit?: number;
    offset?: number;
    market?: string;
  }) {
    return this.http.get(`${this.root}/v1/me/albums`, { params });
  }

  saveAlbumsForUser(params: { ids: string }) {
    return this.http.put(`${this.root}/v1/me/albums`, {}, { params });
  }

  removeAlbumsForUser(params: { ids: string }) {
    return this.http.delete(`${this.root}/v1/me/albums`, { params });
  }

  checkUserSavedAlbums(params: { ids: string }) {
    return this.http.get(`${this.root}/v1/me/albums/contains`, { params });
  }

  getUserSavedTracks(params?: {
    market?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.http.get(`${this.root}/v1/me/tracks`, { params });
  }

  saveTrackForUser(params: { ids: string }) {
    return this.http.put(`${this.root}/v1/me/tracks`, {}, { params });
  }

  removeUserSavedTracks(params: { ids: string }) {
    return this.http.delete(`${this.root}/v1/me/tracks`, { params });
  }

  checkUserSavedTracks(params: { ids: string }) {
    return this.http.get(`${this.root}/v1/me/tracks/contains`, { params });
  }

  getUserSavedEpisodes(params?: {
    market?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.http.get(`${this.root}/v1/me/episodes`, { params });
  }

  saveEpisodesForUser(params: { ids: string }) {
    return this.http.put(`${this.root}/v1/me/episodes`, {}, { params });
  }

  removeUserSavedEpisodes(params: { ids: string }) {
    return this.http.delete(`${this.root}/v1/me/episodes`, { params });
  }

  checkUserSavedEpisodes(params: { ids: string }) {
    return this.http.get(`${this.root}/v1/me/episodes/contains`, { params });
  }

  getUserSavedShows(params?: { limit?: number; offset?: number }) {
    return this.http.get(`${this.root}/v1/me/shows`, { params });
  }

  saveShowsForUser(params: { ids: string }) {
    return this.http.put(`${this.root}/v1/me/shows`, {}, { params });
  }

  removeUserSavedShows(params: { ids: string; market?: string }) {
    return this.http.delete(`${this.root}/v1/me/shows`, { params });
  }

  checkUserSavedShows(params: { ids: string }) {
    return this.http.get(`${this.root}/v1/me/shows/contains`, { params });
  }

  ////////////////// Markets API ////////////////////////////////

  getAvailableMarkets() {
    return this.http.get(`${this.root}/v1/markets`);
  }

  ////////////////// Personalization API ////////////////////////////////

  getUserTopArtists(params?: {
    time_range?: string;
    limit?: string;
    offset?: string;
  }) {
    return this.http.get(`${this.root}/v1/me/top/artists`, { params });
  }

  getUserTopTracks(params?: {
    time_range?: string;
    limit?: string;
    offset?: string;
  }) {
    return this.http.get(`${this.root}/v1/me/top/tracks`, { params });
  }

  ////////////////// Player API ////////////////////////////////

  getInformationAboutUserCurrentPlayback(params?: {
    market?: string;
    additional_types?: string;
  }) {
    return this.http.get(`${this.root}/v1/me/player`, { params });
  }

  transferUserPlayback(body: { device_ids: string; play?: boolean }) {
    return this.http.put(`${this.root}/v1/me/player`, body);
  }

  getUserAvailableDevices() {
    return this.http.get(`${this.root}/v1/me/player/devices`);
  }

  getUserCurrentlyPlayingTrack(params: {
    market: string;
    additional_types?: string;
  }) {
    return this.http.get(`${this.root}/v1/me/player/currently-playing`, {
      params,
    });
  }

  startOrResumeUserPlayback(
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
    return this.http.put(`${this.root}/v1/me/player/play`, body, { params });
  }

  pauseUserPlayback(params?: { device_id?: string }) {
    return this.http.put(`${this.root}/v1/me/player/pause`, {}, { params });
  }

  skipUserPlaybackToNextTrack(params?: { device_id?: string }) {
    return this.http.post(`${this.root}/v1/me/player/next`, {}, { params });
  }

  skipUserPlaybackToPreviousTrack(params?: { device_id?: string }) {
    return this.http.post(`${this.root}/v1/me/player/previous`, {}, { params });
  }

  seekToPositionInCurrentlyPlayingTrack(params: {
    position_ms: number;
    device_id?: string;
  }) {
    return this.http.put(`${this.root}/v1/me/player/seek`, {}, { params });
  }

  setRepeatModeOnUserPlayback(params: { state: string; device_id?: string }) {
    return this.http.put(`${this.root}/v1/me/player/repeat`, {}, { params });
  }

  setVolumeForUserPlayback(params: {
    volume_percent: number;
    device_id?: string;
  }) {
    return this.http.put(`${this.root}/v1/me/player/volume`, {}, { params });
  }

  toggleShuffleForUserPlayback(params: { state: boolean; device_id?: string }) {
    return this.http.put(`${this.root}/v1/me/player/shuffle`, {}, { params });
  }

  getUserRecentlyPlayedTracks(params?: {
    limit?: number;
    after?: number;
    before?: number;
  }) {
    return this.http.get(`${this.root}/v1/me/player/recently-played`, {
      params,
    });
  }

  addItemToQueue(params: { uri: string; device_id?: string }) {
    return this.http.post(`${this.root}/v1/me/player/queue`, {}, { params });
  }

  ////////////////// Playlists API ////////////////////////////////

  getListOfCurrentUserPlaylists(params?: { limit?: number; offset?: number }) {
    return this.http.get<SpotifyApi.ListOfUsersPlaylistsResponse>(
      `${this.root}/v1/me/playlists`,
      { params }
    );
  }

  getListOfUserPlaylists(
    id: string,
    params?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return this.http.get(`${this.root}/v1/users/${id}/playlists`, { params });
  }

  createPlaylist(
    id: string,
    params: {
      name: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    }
  ) {
    return this.http.post(
      `${this.root}/v1/users/${id}/playlists`,
      {},
      { params }
    );
  }

  /**
   * Get a Playlist
   */
  getPlaylist(
    id: string,
    params?: { market?: string; fields?: string; additional_types?: string }
  ) {
    return this.http.get<SpotifyApi.PlaylistTrackResponse>(
      `${this.root}/v1/playlists/${id}`,
      { params }
    );
  }

  changePlaylistDetails(
    id: string,
    body?: {
      name?: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    }
  ) {
    return this.http.put(`${this.root}/v1/playlists/${id}`, body);
  }

  getPlaylistItems(
    id: string,
    params?: {
      market?: string;
      fields?: string;
      limit?: number;
      offset?: number;
      additional_types?: string;
    }
  ) {
    return this.http.get<SpotifyApi.PlaylistTrackResponse>(
      `${this.root}/v1/playlists/${id}/tracks`,
      { params }
    );
  }

  addItemsToPlaylist(
    id: string,
    body: { uris?: string; position?: number },
    params?: { position?: number; uris?: string }
  ) {
    return this.http.post(`${this.root}/v1/playlists/${id}/tracks`, body, {
      params,
    });
  }

  reorderOrReplacePlaylistItems(
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
    return this.http.put(`${this.root}/v1/playlists/${id}/tracks`, body, {
      params,
    });
  }

  removeItemsFromPlaylist(
    id: string,
    body: {
      tracks: string[];
      snapshot_id?: string;
    }
  ) {
    return this.http.delete(`${this.root}/v1/playlists/${id}/tracks`, { body });
  }

  getPlaylistCoverImage(id: string) {
    return this.http.get(`${this.root}/v1/playlists/${id}/images`);
  }

  uploadCustomPlaylistCoverImage(id: string) {
    return this.http.put(`${this.root}/v1/playlists/${id}/images`, {});
  }

  ////////////////// Search API ////////////////////////////////

  searchAlbum(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.http.get(`${this.root}/v1/search`, {
      params: {
        ...params,
        type: 'album',
      },
    });
  }

  searchArtist(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.http.get(`${this.root}/v1/search`, {
      params: {
        ...params,
        type: 'artist',
      },
    });
  }

  searchPlaylist(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.http.get(`${this.root}/v1/search`, {
      params: {
        ...params,
        type: 'playlist',
      },
    });
  }

  searchTrack(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.http.get(`${this.root}/v1/search`, {
      params: {
        ...params,
        type: 'track',
      },
    });
  }

  searchShow(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.http.get(`${this.root}/v1/search`, {
      params: {
        ...params,
        type: 'show',
      },
    });
  }

  searchEpisode(params: {
    q: string;
    market?: string;
    limit?: number;
    offset?: number;
    include_external: '' | 'audio';
  }) {
    return this.http.get(`${this.root}/v1/search`, {
      params: {
        ...params,
        type: 'episode',
      },
    });
  }

  ////////////////// Shows API ////////////////////////////////

  getShows(params: { ids: string; market?: string }) {
    return this.http.get(`${this.root}/v1/shows`, { params });
  }

  getShow(
    id: string,
    params?: {
      market?: string;
    }
  ) {
    return this.http.get(`${this.root}/v1/shows/${id}`, { params });
  }

  getShowEpisodes(
    id: string,
    params?: {
      market?: string;
    }
  ) {
    return this.http.get(`${this.root}/v1/shows/${id}/episodes`, { params });
  }

  ////////////////// Tracks API ////////////////////////////////

  getTracks(params: { ids: string; market?: string }) {
    return this.http.get(`${this.root}/v1/tracks`, { params });
  }

  getTrack(id: string, params?: { market?: string }) {
    return this.http.get(`${this.root}/v1/tracks/${id}`, { params });
  }

  getAudioFeaturesForTracks(params: { ids: string }) {
    return this.http.get(`${this.root}/v1/audio-features`, { params });
  }

  getAudioFeaturesForTrack(id: string) {
    return this.http.get(`${this.root}/v1/audio-features/${id}`);
  }

  getAudioAnalysisForTrack(id: string) {
    return this.http.get(`${this.root}/v1/audio-analysis/${id}`);
  }

  getCurrentUserProfile() {
    return this.http.get<SpotifyApi.CurrentUsersProfileResponse>(
      `${this.root}/v1/me`
    );
  }

  getUserProfile(id: string) {
    return this.http.get(`${this.root}/v1/users/${id}`);
  }
}
