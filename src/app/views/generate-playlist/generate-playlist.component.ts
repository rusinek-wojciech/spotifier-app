import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-playlist',
  templateUrl: './generate-playlist.component.html',
  styleUrls: ['./generate-playlist.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class GeneratePlaylistComponent {
  form;

  constructor(private formBuilder: FormBuilder) {
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
