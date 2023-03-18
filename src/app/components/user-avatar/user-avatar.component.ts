import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyApi } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-avatar[user]',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() user!: SpotifyApi.CurrentUsersProfileResponse;
  private static readonly AVATAR = 'assets/images/avatar.png';

  constructor(private auth: AuthService, private router: Router) {}

  handleSettingsClick() {
    this.router.navigate(['home', 'settings']);
  }

  handleLogoutClick() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  get avatarImage() {
    const avatar = this.user.images?.[0]?.url ?? UserAvatarComponent.AVATAR;
    return `url(${avatar})`;
  }
}
