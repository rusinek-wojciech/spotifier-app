import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { authGuard } from './shared/guards';
import { HomeComponent } from './core/components/home/home.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { TracklistComponent } from './views/tracklist/tracklist.component';
import { GeneratePlaylistComponent } from './views/generate-playlist/generate-playlist.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { LoginComponent } from './core/components/login/login.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalInterceptor } from '@app/shared/interceptors/global.interceptor';
import {
  AuthService,
  LocalStorageService,
  LoggerService,
  ObserverService,
  SpotifyApiHttpService,
  SpotifyAuthHttpService,
} from '@app/shared/services';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'playlists',
        component: PlaylistComponent,
      },
      {
        path: 'playlist/:id',
        component: TracklistComponent,
      },
      {
        path: 'generate-playlist',
        component: GeneratePlaylistComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([globalInterceptor])),
    LocalStorageService,
    LoggerService,
    AuthService,
    ObserverService,
    SpotifyApiHttpService,
    SpotifyAuthHttpService,
  ],
};
