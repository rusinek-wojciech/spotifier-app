import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyApi } from 'src/app/models';
import { PATHS } from 'src/app/constants/paths.constants';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
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
