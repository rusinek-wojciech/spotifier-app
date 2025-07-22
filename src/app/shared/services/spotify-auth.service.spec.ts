import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SpotifyAuthService } from './spotify-auth.service';

describe('SpotifyAuthService', () => {
  let service: SpotifyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SpotifyAuthService,
      ],
    });
    service = TestBed.inject(SpotifyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
