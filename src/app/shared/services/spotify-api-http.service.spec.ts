import { TestBed } from '@angular/core/testing';

import { SpotifyApiHttpService } from './spotify-api-http.service';

describe('SpotifyApiHttpService', () => {
  let service: SpotifyApiHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyApiHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
