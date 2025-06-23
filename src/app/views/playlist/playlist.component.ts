import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import {
  PaginationComponent,
  PaginationEvent,
} from '@app/shared/components/pagination/pagination.component';
import { ObserverService, SpotifyApiHttpService } from '@app/shared/services';
import { PATHS } from '@app/shared/constants';
import { PlaylistCardComponent } from '@app/views/playlist-card/playlist-card.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  standalone: true,
  imports: [PaginationComponent, PlaylistCardComponent, MatGridListModule],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private readonly spotifyApiHttpService = inject(SpotifyApiHttpService);
  private readonly observer = inject(ObserverService);
  private readonly router = inject(Router);

  private readonly sub = new Subject<void>();

  readonly length = signal(0);
  readonly columns = signal(0);
  readonly playlists = signal<SpotifyApi.PlaylistObjectSimplified[]>([]);

  ngOnInit(): void {
    this.setColumns();
  }

  public handlePaginationChange(event: PaginationEvent) {
    this.getPlaylistsWithPagination(event);
  }

  public handleClick(playlist: SpotifyApi.PlaylistObjectSimplified): void {
    this.router.navigate([PATHS.PLAYLIST, playlist.id]);
  }

  public ngOnDestroy(): void {
    this.sub.next();
    this.sub.complete();
  }

  private setColumns(): void {
    this.observer
      .observe()
      .pipe(
        takeUntil(this.sub),
        tap(columns => this.columns.set(columns))
      )
      .subscribe();
  }

  private getPlaylistsWithPagination(event: PaginationEvent): void {
    this.spotifyApiHttpService
      .getListOfCurrentUserPlaylists(event)
      .pipe(
        take(1),
        tap(({ items, total }) => {
          this.playlists.set(items);
          this.length.set(total);
        })
      )
      .subscribe();
  }
}
