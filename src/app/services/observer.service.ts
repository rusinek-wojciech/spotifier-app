import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
  private readonly breakpointsToObserve = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];

  private readonly breakpointToColumn = {
    [Breakpoints.XSmall]: 2,
    [Breakpoints.Small]: 3,
    [Breakpoints.Medium]: 4,
    [Breakpoints.Large]: 6,
    [Breakpoints.XLarge]: 8,
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  public observe(): Observable<number> {
    return this.breakpointObserver.observe(this.breakpointsToObserve).pipe(
      filter(br => br.matches),
      map(
        ({ breakpoints }) =>
          this.breakpointToColumn[
            Object.entries(breakpoints).find(([_, v]) => v)?.[0]!
          ]
      )
    );
  }
}
