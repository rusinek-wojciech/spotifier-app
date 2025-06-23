import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class TrackComponent {
  readonly track = input.required<SpotifyApi.PlaylistTrackObject>();
  readonly image = computed(() => this.track().track?.album.images[2].url!);
  readonly authors = computed(() =>
    this.track()
      .track?.artists.map(artist => artist.name)
      .join(' & ')
  );
}
