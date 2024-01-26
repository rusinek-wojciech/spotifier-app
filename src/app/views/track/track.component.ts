import { Component, Input } from '@angular/core';
import { SpotifyApi } from 'src/app/models';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent {
  @Input() track!: SpotifyApi.PlaylistTrackObject;

  getAuthors(item: SpotifyApi.PlaylistTrackObject) {
    return item.track?.artists.map(artist => artist.name).join(' & ');
  }

  image(item: SpotifyApi.PlaylistTrackObject): string {
    return item.track?.album.images[2].url!;
  }
}
