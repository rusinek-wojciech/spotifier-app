import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';

import {
  PaginationComponent,
  PaginationEvent,
} from '@app/shared/components/pagination/pagination.component';
import { SpotifyApiHttpService } from '@app/shared/services';
import { TrackComponent } from '@app/views/track/track.component';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss'],
  standalone: true,
  imports: [
    PaginationComponent,
    TrackComponent,
    MatListModule,
    MatGridListModule,
  ],
})
export class TracklistComponent implements OnDestroy {
  private readonly spotifyApiHttpService = inject(SpotifyApiHttpService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

  readonly total = signal(0);
  readonly items = signal<SpotifyApi.PlaylistTrackObject[]>([]);

  private id = this.route.snapshot.paramMap.get('id') as string;

  public handlePaginationChange(event: PaginationEvent): void {
    this.getPlaylistItemsWithPagination(event);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPlaylistItemsWithPagination(event: PaginationEvent): void {
    this.spotifyApiHttpService
      .getPlaylistItems(this.id, event)
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        tap(({ items, total }) => {
          this.items.set(items);
          this.total.set(total);
        })
      )
      .subscribe();
  }
}
