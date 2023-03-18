import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user$ = this.apiService.getCurrentUserProfile$().pipe(shareReplay(1));

  constructor(private apiService: ApiService) {}
}
