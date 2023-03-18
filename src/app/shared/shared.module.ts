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
import { PaginatorComponent } from './paginator/paginator.component';
import { PaginatedListComponent } from './paginated-list/paginated-list.component';

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
];

const components = [PaginatorComponent, PaginatedListComponent];

@NgModule({
  declarations: [...components],
  imports: [...materials],
  exports: [CommonModule, ...materials, ...components],
})
export class SharedModule {}
