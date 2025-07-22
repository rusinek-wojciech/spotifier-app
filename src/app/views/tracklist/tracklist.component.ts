import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';

import {
  PaginationComponent,
  PaginationEvent,
} from '@app/shared/components/pagination/pagination.component';
import { SpotifyApiService } from '@app/shared/services';
import { TrackComponent } from '@app/views/track/track.component';

const TRACKLIST_ID = 'id' as const;

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
  private readonly spotifyApiHttpService = inject(SpotifyApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();
  private readonly id = this.route.snapshot.paramMap.get(
    TRACKLIST_ID
  ) as string;

  readonly total = signal(0);
  readonly items = signal<SpotifyApi.PlaylistTrackObject[]>([]);

  public handlePaginationChange(event: PaginationEvent): void {
    this.getPlaylistItemsWithPagination(event).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPlaylistItemsWithPagination(
    event: PaginationEvent
  ): Observable<SpotifyApi.PlaylistTrackResponse> {
    return this.spotifyApiHttpService.getPlaylistItems(this.id, event).pipe(
      takeUntil(this.destroy$),
      take(1),
      tap(({ items, total }) => {
        this.items.set(items);
        this.total.set(total);
      })
    );
  }
}
