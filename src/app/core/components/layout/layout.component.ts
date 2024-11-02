import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { shareReplay } from 'rxjs';

import { UserAvatarComponent } from '@app/shared/components/user-avatar/user-avatar.component';
import { PATHS } from '@app/shared/constants';
import { SpotifyApiHttpService } from '@app/shared/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    UserAvatarComponent,
  ],
})
export class LayoutComponent {
  readonly PATHS = PATHS;

  user$ = this.spotifyApiHttpService
    .getCurrentUserProfile()
    .pipe(shareReplay(1));

  constructor(private spotifyApiHttpService: SpotifyApiHttpService) {}
}
