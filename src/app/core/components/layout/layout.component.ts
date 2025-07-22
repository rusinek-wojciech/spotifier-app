import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { shareReplay, Subject, takeUntil } from 'rxjs';

import { UserAvatarComponent } from '@app/shared/components/user-avatar/user-avatar.component';
import { PATHS } from '@app/shared/constants';
import { SpotifyApiService } from '@app/shared/services';

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
export class LayoutComponent implements OnDestroy {
  private readonly spotifyApiHttpService = inject(SpotifyApiService);
  private readonly destroy$ = new Subject<void>();

  readonly PATHS = PATHS;

  readonly user$ = this.spotifyApiHttpService
    .getCurrentUserProfile()
    .pipe(takeUntil(this.destroy$), shareReplay(1));

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
