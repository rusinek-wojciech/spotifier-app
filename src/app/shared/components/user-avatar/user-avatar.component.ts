import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { PATHS } from 'src/app/shared/constants/paths.constants';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  standalone: true,
  imports: [RouterModule, MatMenuModule, MatIconModule],
})
export class UserAvatarComponent {
  readonly PATHS = PATHS;
  private readonly AVATAR = 'assets/images/avatar.png';

  @Input({ required: true }) user!: SpotifyApi.CurrentUsersProfileResponse;

  constructor() {}

  get avatarImage(): string {
    const avatar = this.user.images?.[0]?.url ?? this.AVATAR;
    return `url(${avatar})`;
  }
}
