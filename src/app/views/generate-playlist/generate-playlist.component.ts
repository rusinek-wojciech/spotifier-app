import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from 'src/app/shared/services';

@Component({
  selector: 'app-generate-playlist',
  templateUrl: './generate-playlist.component.html',
  styleUrls: ['./generate-playlist.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class GeneratePlaylistComponent {
  form;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
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
