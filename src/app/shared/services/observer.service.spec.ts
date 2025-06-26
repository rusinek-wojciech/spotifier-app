import { TestBed } from '@angular/core/testing';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

import { ObserverService } from './observer.service';

describe('ObserverService', () => {
  const breakpointsMock = {
    [Breakpoints.XSmall]: false,
    [Breakpoints.Small]: true,
    [Breakpoints.Medium]: true,
    [Breakpoints.Large]: false,
  };

  let service: ObserverService;
  let breakpointObserverMock: {
    observe: jest.Mock<Observable<BreakpointState>>;
  };

  beforeEach(() => {
    breakpointObserverMock = {
      observe: jest.fn(() =>
        of({ matches: true, breakpoints: breakpointsMock })
      ),
    };

    TestBed.configureTestingModule({
      providers: [
        ObserverService,
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    });

    service = TestBed.inject(ObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should observe breakpoints and return corresponding column number', done => {
    const expectedColumnNumber = 3;
    service.observe().subscribe(result => {
      expect(result).toBe(expectedColumnNumber);
      done();
    });
  });

  it('should find the matching key for a BreakpointState', () => {
    const key = service.findMatchingKey(breakpointsMock);
    expect(key).toBe(Breakpoints.Small);
  });
});
