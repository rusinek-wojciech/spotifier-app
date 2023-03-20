import { Component, Input } from '@angular/core';
import { PATHS } from 'src/app/constants/paths.constants';
import { SpotifyApi } from 'src/app/models';

@Component({
  selector: 'app-user-avatar[user]',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  readonly PATHS = PATHS;

  @Input() user!: SpotifyApi.CurrentUsersProfileResponse;
  private static readonly AVATAR = 'assets/images/avatar.png';

  constructor() {}

  get avatarImage() {
    const avatar = this.user.images?.[0]?.url ?? UserAvatarComponent.AVATAR;
    return `url(${avatar})`;
  }
}
