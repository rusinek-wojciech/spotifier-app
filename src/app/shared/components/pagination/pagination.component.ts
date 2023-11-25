import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface PaginationEvent {
  limit: number;
  offset: number;
}

@Component({
  selector: 'app-pagination[length]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  pageIndex = 0;
  @Input() pageSizeOptions = [10, 20, 50] as const;
  @Input() pageSize = 20;
  @Input() length = 0;
  @Output() onChange = new EventEmitter<PaginationEvent>();

  ngOnInit() {
    this.emitChange();
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.scrollToTop();
    this.emitChange();
  }

  private emitChange() {
    this.onChange.emit({
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize,
    });
  }

  private scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
