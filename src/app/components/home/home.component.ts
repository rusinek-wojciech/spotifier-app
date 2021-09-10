import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ApiService } from 'src/app/services/api.service';
import { CurrentUsersProfileResponse } from 'spotify-api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  user!: CurrentUsersProfileResponse;

  readonly avatar = '../../../assets/images/avatar.png';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService
      .getCurrentUserProfile$()
      .subscribe((user: CurrentUsersProfileResponse) => (this.user = user));
  }

  onClickLogout(): void {
    this.router.navigate(['logout']);
  }

  onClickTest(): void {
    const id = 'nodusclientpl';
    this.apiService.getUserProfile$(id).subscribe((v) => console.log(v));
  }
}
