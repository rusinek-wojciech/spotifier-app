import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable()
export class ObserverService {
  private readonly breakpointsToObserve = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];

  private readonly breakpointsToColumn = {
    [Breakpoints.XSmall]: 2,
    [Breakpoints.Small]: 3,
    [Breakpoints.Medium]: 4,
    [Breakpoints.Large]: 6,
    [Breakpoints.XLarge]: 8,
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  public observe(
    options = {
      breakpointsToObserve: this.breakpointsToObserve,
      breakpointsToColumn: this.breakpointsToColumn,
    }
  ): Observable<number> {
    return this.breakpointObserver.observe(options.breakpointsToObserve).pipe(
      filter(state => state.matches),
      map(state => this.findMatchingKey(state.breakpoints)),
      map(key => options.breakpointsToColumn[key])
    );
  }

  public findMatchingKey(br: BreakpointState['breakpoints']) {
    const entries = Object.entries(br);
    const keys = entries.filter(b => b[1]).map(b => b[0]);
    return keys[0];
  }
}
