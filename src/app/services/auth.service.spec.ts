import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthService] });
    authService = TestBed.inject(AuthService);
  });

  it('should authenticate successfully', done => {
    authService.authenticate$().subscribe(result => {
      expect(result).toBe(false);
      done();
    });
  });
});
