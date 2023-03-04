import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { shareReplay } from 'rxjs';
import { SpotifyApi } from 'src/app/models/spotify-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private static readonly AVATAR = 'assets/images/avatar.png';
  @ViewChild('drawer') drawer!: MatDrawer;
  user$ = this.apiService.getCurrentUserProfile$().pipe(shareReplay(1));

  constructor(
    private apiService: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  handleLogoutClick(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getAvatarUrl(user: SpotifyApi.CurrentUsersProfileResponse) {
    const avatar = user?.images?.[0]?.url ?? HomeComponent.AVATAR;
    return `url(${avatar})`;
  }
}
