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
         declarations: [],
         imports: [
            MatFormFieldModule,
            MatSelectModule,
            BrowserAnimationsModule,
            PlayerRatingComponent
         ]
      });
      fixture = TestBed.createComponent(PlayerRatingComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
