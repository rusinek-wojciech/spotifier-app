import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneratePlaylistComponent } from './components/generate-playlist/generate-playlist.component';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlaylistsComponent,
    GeneratePlaylistComponent,
    UserAvatarComponent,
    SettingsComponent,
  ],
  imports: [SharedModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
