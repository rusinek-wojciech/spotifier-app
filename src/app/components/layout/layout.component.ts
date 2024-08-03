import { Component } from '@angular/core';
import { shareReplay } from 'rxjs';
import { PATHS } from 'src/app/constants/paths.constants';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  readonly PATHS = PATHS;

  user$ = this.spotifyService.getCurrentUserProfile$().pipe(shareReplay(1));

  constructor(private spotifyService: SpotifyService) {}
}
