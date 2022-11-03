import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

interface User {
  images: { url: string }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  user!: User;

  readonly avatar = '../../../assets/images/avatar.png';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService
      .getCurrentUserProfile$()
      .subscribe((user) => (this.user = user as User));
  }

  onClickLogout(): void {
    this.router.navigate(['logout']);
  }

  onClickTest(): void {
    const id = 'nodusclientpl';
    this.apiService.getUserProfile$(id).subscribe((v) => console.log(v));
  }
}
