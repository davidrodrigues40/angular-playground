import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPlayerComponent } from './add-player.component';
import { MockComponent } from 'src/app/testing/testing.directive';

describe('AddPlayerComponent', () => {
   let component: AddPlayerComponent;
   let fixture: ComponentFixture<AddPlayerComponent>;
   let event: jasmine.SpyObj<KeyboardEvent> = jasmine.createSpyObj('Event', ['key']);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [],
         imports: [
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatIconModule,
            FormsModule,
            BrowserAnimationsModule,
            AddPlayerComponent,
            MockComponent({ selector: 'app-player-rating', inputs: ['ratings'], outputs: ['ratingChanged'] }),
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(AddPlayerComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });


   describe('when keypressed', () => {
      beforeEach(() => {
         Object.defineProperty(event, 'key', { value: 'Enter' });
         spyOn(component.addPlayer, 'emit');
         spyOn(component.clear, 'emit');
         spyOn(component.newGame, 'emit');
      })
      it('should emit add player', () => {
         component.playerName = 'test';
         component.playerRating = 1;

         component.keypressed(event);

         expect(component.addPlayer.emit).toHaveBeenCalledOnceWith({ name: 'test', rating: 1 });
      });

      it('should emit clear', () => {
         component.playerName = 'clear';
         component.playerRating = 1;

         component.keypressed(event);

         expect(component.clear.emit).toHaveBeenCalledTimes(1);
         expect(component.playerName).toEqual('');
         expect(component.playerRating).toEqual(0);
      });

      it('should emit new game', () => {
         component.playerName = '';
         component.playerRating = 1;

         component.keypressed(event);

         expect(component.newGame.emit).toHaveBeenCalledTimes(1);
      })
   });

   describe('when rating changed', () => {
      it('should set playerRating', () => {
         component.playerRating = 0;

         component.ratingChanged(1);

         expect(component.playerRating).toEqual(1);
      });
   });
});
