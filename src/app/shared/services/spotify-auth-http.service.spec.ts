import { TestBed } from '@angular/core/testing';

import { SpotifyAuthHttpService } from './spotify-auth-http.service';

describe('SpotifyAuthHttpService', () => {
  let service: SpotifyAuthHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyAuthHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
