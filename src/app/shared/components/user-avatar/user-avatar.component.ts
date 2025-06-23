import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { PATHS } from '@app/shared/constants';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  standalone: true,
  imports: [RouterModule, MatMenuModule, MatIconModule, MatButtonModule],
})
export class UserAvatarComponent {
  private readonly auth = inject(AuthService);
  private readonly AVATAR = 'assets/images/avatar.png';

  readonly PATHS = PATHS;
  readonly user = input.required<SpotifyApi.CurrentUsersProfileResponse>();
  readonly avatarImage = computed(
    () => `url(${this.user().images?.[0]?.url ?? this.AVATAR})`
  );

  protected handleLogout(): void {
    this.auth.removeToken();
  }
}
