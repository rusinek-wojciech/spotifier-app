import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratePlaylistComponent } from 'src/app/views/generate-playlist/generate-playlist.component';
import { SettingsComponent } from 'src/app/views/settings/settings.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PlaylistsComponent } from './views/playlists/playlists.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from 'src/app/components/layout/layout.component';
import { PlaylistComponent } from 'src/app/views/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'playlists',
        component: PlaylistsComponent,
      },
      {
        path: 'playlist/:id',
        component: PlaylistComponent,
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
