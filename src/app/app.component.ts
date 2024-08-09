import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  template: '<router-outlet />',
  selector: 'app-root',
  imports: [RouterModule],
})
export class AppComponent {}
