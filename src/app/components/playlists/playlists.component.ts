import { Component } from '@angular/core';
import { SpotifyApi } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { PaginationEvent } from 'src/app/shared/components/pagination/pagination.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const breakpoints = {
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
  length = 0;
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
  cols: number = 0;

  constructor(
    private api: ApiService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        if (result.matches) {
          const [size, _] = Object.entries(result.breakpoints).find(
            b => !!b[1]
          )!;
          this.cols = breakpoints[size];
        }
      });
  }

  handlePaginationChange(event: PaginationEvent) {
    this.getPlaylistsWithPagination(event);
  }

  private getPlaylistsWithPagination(event: PaginationEvent) {
    this.api.getListOfCurrentUserPlaylists$(event).subscribe(playlists => {
      this.playlists = playlists.items;
      this.length = playlists.total;
    });
  }

  image(playlist: SpotifyApi.PlaylistObjectSimplified) {
    return playlist.images[0].url;
  }
}
