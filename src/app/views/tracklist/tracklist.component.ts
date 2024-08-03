import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { SpotifyApi } from 'src/app/models';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PaginationEvent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss'],
})
export class TracklistComponent implements OnInit {
  total: number = 0;
  columns: number = 0;
  items: SpotifyApi.PlaylistTrackObject[] = [];

  private id!: string;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  handlePaginationChange(event: PaginationEvent) {
    this.getPlaylistItemsWithPagination(event);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  private getPlaylistItemsWithPagination(event: PaginationEvent) {
    this.spotifyService
      .getPlaylistItems$(this.id, event)
      .pipe(take(1))
      .subscribe(({ items, total }) => {
        this.items = items;
        this.total = total;
      });
  }
}
