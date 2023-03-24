import { Component } from '@angular/core';
import { SpotifyApi } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { PaginationEvent } from 'src/app/shared/components/pagination/pagination.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const breakpointsToObserve = [
  Breakpoints.XSmall,
  Breakpoints.Small,
  Breakpoints.Medium,
  Breakpoints.Large,
  Breakpoints.XLarge,
];

const breakpointToColumn = {
  [Breakpoints.XSmall]: 2,
  [Breakpoints.Small]: 3,
  [Breakpoints.Medium]: 4,
  [Breakpoints.Large]: 5,
  [Breakpoints.XLarge]: 6,
};

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  length: number = 0;
  columns: number = 0;
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  constructor(
    private api: ApiService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.setBreakpointObserver();
  }

  handlePaginationChange(event: PaginationEvent) {
    this.getPlaylistsWithPagination(event);
  }

  private setBreakpointObserver() {
    this.breakpointObserver
      .observe(breakpointsToObserve)
      .subscribe(({ matches, breakpoints }) => {
        if (matches) {
          const [key] = Object.entries(breakpoints).find(([_, v]) => v)!;
          this.columns = breakpointToColumn[key];
        }
      });
  }

  private getPlaylistsWithPagination(event: PaginationEvent) {
    this.api
      .getListOfCurrentUserPlaylists$(event)
      .subscribe(({ items, total }) => {
        this.playlists = items;
        this.length = total;
      });
  }

  image(playlist: SpotifyApi.PlaylistObjectSimplified) {
    return playlist.images[0].url;
  }

  handleClick(playlist: SpotifyApi.PlaylistObjectSimplified) {
    console.log(playlist);
  }
}
