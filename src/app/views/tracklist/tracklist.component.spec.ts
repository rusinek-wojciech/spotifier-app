import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SpotifyApiService } from '@app/shared/services';

import { TracklistComponent } from './tracklist.component';

describe('TracklistComponent', () => {
  let component: TracklistComponent;
  let fixture: ComponentFixture<TracklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracklistComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        SpotifyApiService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TracklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
