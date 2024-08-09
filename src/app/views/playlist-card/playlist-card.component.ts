import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { PATHS } from 'src/app/shared/constants';
import { UnicodePipe } from 'src/app/shared/pipes';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, UnicodePipe],
})
export class PlaylistCardComponent {
  @Input() playlist!: SpotifyApi.PlaylistObjectSimplified;

  constructor(private router: Router) {}

  image(playlist: SpotifyApi.PlaylistObjectSimplified): string {
    return playlist.images[0].url;
  }

  handleClick(playlist: SpotifyApi.PlaylistObjectSimplified): void {
    this.router.navigate([PATHS.PLAYLIST, playlist.id]);
  }
}
