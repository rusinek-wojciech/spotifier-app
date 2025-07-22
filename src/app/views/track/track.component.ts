import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatGridListModule],
})
export class TrackComponent {
  readonly track = input.required<SpotifyApi.PlaylistTrackObject>();
  readonly image = computed(() => this.track().track?.album.images[2].url);
  readonly album = computed(() => this.track().track?.album.name);
  readonly popularity = computed(() => this.track().track?.popularity);
  readonly authors = computed(() =>
    this.track()
      .track?.artists.map(artist => artist.name)
      .join(' & ')
  );
}
