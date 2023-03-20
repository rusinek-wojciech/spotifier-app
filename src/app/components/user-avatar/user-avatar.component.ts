import { Component, Input } from '@angular/core';
import { PATHS } from 'src/app/constants/paths.constants';
import { SpotifyApi } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-avatar[user]',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  readonly PATHS = PATHS;

  @Input() user!: SpotifyApi.CurrentUsersProfileResponse;
  private static readonly AVATAR = 'assets/images/avatar.png';

  constructor(private auth: AuthService) {}

  handleLogoutClick() {
    this.auth.logout();
  }

  get avatarImage() {
    const avatar = this.user.images?.[0]?.url ?? UserAvatarComponent.AVATAR;
    return `url(${avatar})`;
  }
}
