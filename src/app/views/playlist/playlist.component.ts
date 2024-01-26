import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyApi } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { PaginationEvent } from 'src/app/shared/components/pagination/pagination.component';
import { Subject, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths.constants';
import { ObserverService } from 'src/app/services/observer.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private sub = new Subject<void>();
  length: number = 0;
  columns: number = 0;
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  constructor(
    private api: ApiService,
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
    this.api
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
