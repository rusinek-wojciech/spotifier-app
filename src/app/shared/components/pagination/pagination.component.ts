import {
  Component,
  input,
  OnInit,
  output,
  signal,
  untracked,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface PaginationEvent {
  limit: number;
  offset: number;
}

@Component({
  selector: 'app-pagination[length]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule],
})
export class PaginationComponent implements OnInit {
  readonly pageIndex = signal(0);
  readonly pageSizeOptions = signal([10, 20, 50] as const);
  readonly pageSize = signal(20);
  readonly length = input(0);
  readonly changed = output<PaginationEvent>();

  public ngOnInit(): void {
    this.emitChange();
  }

  public handlePageEvent(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.scrollToTop();
    this.emitChange();
  }

  private emitChange(): void {
    this.changed.emit({
      limit: untracked(this.pageSize),
      offset: untracked(this.pageIndex) * untracked(this.pageSize),
    });
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
