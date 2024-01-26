import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePlaylistComponent } from 'src/app/views/generate-playlist/generate-playlist.component';
import { SettingsComponent } from 'src/app/views/settings/settings.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { TracklistComponent } from 'src/app/views/tracklist/tracklist.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
