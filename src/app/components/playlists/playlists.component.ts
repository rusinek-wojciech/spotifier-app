import { Component } from '@angular/core';
import { shareReplay } from 'rxjs';
import { SpotifyApi } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { PaginationEvent } from 'src/app/shared/paginator/paginator.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  length = 0;

  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  constructor(private api: ApiService) {}

  onPaginatorChange(event: PaginationEvent) {
    this.getPlaylistsWithPagination(event);
  }

  private getPlaylistsWithPagination(event: PaginationEvent) {
    this.api
      .getListOfCurrentUserPlaylists$(event)
      .pipe(shareReplay(1))
      .subscribe(playlists => {
        this.playlists = playlists.items;
        this.length = playlists.total;
      });
  }
}
