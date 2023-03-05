import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { shareReplay } from 'rxjs';
import { SpotifyApi } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  readonly pageSize = 10;
  total = 0;
  pageIndex = 0;

  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getPlaylistsWithPagination();
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.getPlaylistsWithPagination();
  }

  private getPlaylistsWithPagination() {
    this.api
      .getListOfCurrentUserPlaylists$({
        limit: this.pageSize,
        offset: this.pageIndex * this.pageSize,
      })
      .pipe(shareReplay(1))
      .subscribe((playlists) => {
        this.playlists = playlists.items;
        this.total = playlists.total;
      });
  }
}
