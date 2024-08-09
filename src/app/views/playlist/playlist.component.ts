import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import {
  PaginationComponent,
  PaginationEvent,
} from 'src/app/shared/components/pagination/pagination.component';
import { ObserverService, SpotifyService } from 'src/app/shared/services';
import { PATHS } from 'src/app/shared/constants';
import { PlaylistCardComponent } from 'src/app/views/playlist-card/playlist-card.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  standalone: true,
  imports: [PaginationComponent, PlaylistCardComponent, MatGridListModule],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private sub = new Subject<void>();
  length: number = 0;
  columns: number = 0;
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private observer: ObserverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.observer
      .observe()
      .pipe(takeUntil(this.sub))
      .subscribe({
        next: columns => {
          this.columns = columns;
        },
      });
  }

  handlePaginationChange(event: PaginationEvent) {
    this.getPlaylistsWithPagination(event);
  }

  private getPlaylistsWithPagination(event: PaginationEvent) {
    this.spotifyService
      .getListOfCurrentUserPlaylists$(event)
      .pipe(take(1))
      .subscribe(({ items, total }) => {
        this.playlists = items;
        this.length = total;
      });
  }

  image(playlist: SpotifyApi.PlaylistObjectSimplified): string {
    return playlist.images[0].url;
  }

  handleClick(playlist: SpotifyApi.PlaylistObjectSimplified): void {
    this.router.navigate([PATHS.PLAYLIST, playlist.id]);
  }

  ngOnDestroy() {
    this.sub.next();
    this.sub.complete();
  }
}
