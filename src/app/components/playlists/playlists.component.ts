import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

interface Playlist {
  name: string;
  description: string;
  images: { url: string }[];
}

type Playlists = Playlist[];

interface PlaylistResponse {
  items: Playlists;
}

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  playlists!: Playlists;
  private subs: Subscription[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.subs.push(
      this.api.getListOfCurrentUserPlaylists$().subscribe((playlists) => {
        this.playlists = (playlists as PlaylistResponse).items;
        console.log(this.playlists);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
