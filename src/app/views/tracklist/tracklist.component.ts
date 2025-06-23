import { Component, inject, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs';

import {
  PaginationComponent,
  PaginationEvent,
} from '@app/shared/components/pagination/pagination.component';
import { SpotifyApiHttpService } from '@app/shared/services';
import { TrackComponent } from '@app/views/track/track.component';
import { MatGridListModule } from '@angular/material/grid-list';

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
export class TracklistComponent {
  private readonly spotifyApiHttpService = inject(SpotifyApiHttpService);
  private readonly route = inject(ActivatedRoute);

  readonly total = signal(0);
  readonly items = signal<SpotifyApi.PlaylistTrackObject[]>([]);

  private id = this.route.snapshot.paramMap.get('id') as string;

  public handlePaginationChange(event: PaginationEvent): void {
    this.getPlaylistItemsWithPagination(event);
  }

  private getPlaylistItemsWithPagination(event: PaginationEvent): void {
    this.spotifyApiHttpService
      .getPlaylistItems(this.id, event)
      .pipe(
        take(1),
        tap(({ items, total }) => {
          this.items.set(items);
          this.total.set(total);
        })
      )
      .subscribe();
  }
}
