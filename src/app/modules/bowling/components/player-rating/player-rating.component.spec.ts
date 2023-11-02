import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerRatingComponent } from './player-rating.component';

describe('PlayerRatingComponent', () => {
  let component: PlayerRatingComponent;
  let fixture: ComponentFixture<PlayerRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerRatingComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(PlayerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
