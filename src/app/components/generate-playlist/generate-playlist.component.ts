import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-generate-playlist',
  templateUrl: './generate-playlist.component.html',
  styleUrls: ['./generate-playlist.component.scss'],
})
export class GeneratePlaylistComponent {
  form;

  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      acousticness: 0,
      energy: 0,
      loudness: 0,
    });
  }

  onSubmit() {
    console.log(this.form.value);
    // this.api.getRecommendations$({}).subscribe(recommendations => {});
  }
}
