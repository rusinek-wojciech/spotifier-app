import { Component, computed, inject, input, untracked } from '@angular/core';
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
  private readonly router = inject(Router);
  readonly playlist = input.required<SpotifyApi.PlaylistObjectSimplified>();
  readonly image = computed(() => this.playlist().images[0].url);

  public handleClick(): void {
    this.router.navigate([PATHS.PLAYLIST, untracked(this.playlist).id]);
  }
}
