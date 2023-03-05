import { Component, OnInit } from '@angular/core';
import { SpotifyApi } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .getListOfCurrentUserPlaylists$({ limit: 10 })
      .subscribe((playlists) => {
        this.playlists = playlists.items;
      });
  }
}
