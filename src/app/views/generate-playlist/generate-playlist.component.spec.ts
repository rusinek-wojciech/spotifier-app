import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePlaylistComponent } from './generate-playlist.component';

describe('GeneratePlaylistComponent', () => {
  let component: GeneratePlaylistComponent;
  let fixture: ComponentFixture<GeneratePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratePlaylistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
