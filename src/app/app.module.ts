import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PlaylistsComponent } from './views/playlists/playlists.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneratePlaylistComponent } from './views/generate-playlist/generate-playlist.component';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UnicodePipe } from './pipes/unicode.pipe';
import { PlaylistComponent } from './views/playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlaylistsComponent,
    GeneratePlaylistComponent,
    UserAvatarComponent,
    SettingsComponent,
    LayoutComponent,
    UnicodePipe,
    PlaylistComponent,
  ],
  imports: [SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
