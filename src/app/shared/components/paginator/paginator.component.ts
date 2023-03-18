import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface PaginationEvent {
  limit: number;
  offset: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  @Input() length = 0;
  @Output() onChange = new EventEmitter<PaginationEvent>();

  ngOnInit() {
    this.emitChange();
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.emitChange();
  }

  private emitChange() {
    this.onChange.emit({
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize,
    });
  }
}
