import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneratePlaylistComponent } from './views/generate-playlist/generate-playlist.component';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UnicodePipe } from './pipes/unicode.pipe';
import { TracklistComponent } from './views/tracklist/tracklist.component';
import { PlaylistCardComponent } from 'src/app/views/playlist-card/playlist-card.component';
import { TrackComponent } from 'src/app/views/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlaylistComponent,
    GeneratePlaylistComponent,
    UserAvatarComponent,
    SettingsComponent,
    LayoutComponent,
    UnicodePipe,
    TracklistComponent,
    PlaylistCardComponent,
    TrackComponent,
  ],
  imports: [SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
