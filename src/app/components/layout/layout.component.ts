import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { shareReplay } from 'rxjs';
import { PATHS } from 'src/app/constants/paths.constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  readonly PATHS = PATHS;

  user$ = this.apiService.getCurrentUserProfile$().pipe(shareReplay(1));

  constructor(private apiService: ApiService) {}
}
