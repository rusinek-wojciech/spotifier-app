import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';

const materials = [
  MatCardModule,
  MatButtonModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCommonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatGridListModule,
];

const angular = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  AppRoutingModule,
];

const components = [PaginationComponent];

@NgModule({
  declarations: [...components],
  imports: [...materials, ...angular],
  exports: [CommonModule, ...materials, ...components, ...angular],
})
export class SharedModule {}
