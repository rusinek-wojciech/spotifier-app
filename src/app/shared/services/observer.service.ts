import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

type BreakpointsType = BreakpointState['breakpoints'];

@Injectable()
export class ObserverService {
  private readonly breakpointObserver = inject(BreakpointObserver);

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

  public findMatchingKey(br: BreakpointsType): string {
    const [key, _value] = Object.entries(br).find(([_key, value]) => value)!;
    return key;
  }
}
