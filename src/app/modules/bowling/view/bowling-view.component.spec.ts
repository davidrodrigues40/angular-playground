import { of } from 'rxjs';
import { Player } from 'src/app/interfaces/models/bowling/player';
import { BowlingState } from 'src/app/state/bowling/bowling.state';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';
import { StateEvent } from 'src/app/state/common/state-event';
import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';

import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';
import { BowlerRating } from '../models/bowler-rating.model';
import { BowlingViewComponent } from './bowling-view.component';

describe('BowlingViewComponent', () =>
{
   let component: BowlingViewComponent;
   let fixture: ComponentFixture<BowlingViewComponent>;
   let service: jasmine.SpyObj<BowlingStateService> = jasmine.createSpyObj('BowlingStateService', [], ['events', 'observables']);
   let event: jasmine.SpyObj<StateEvent<string, Store<BowlingState>>> = jasmine.createSpyObj('Event', ['emit']);
   let playerEvent: jasmine.SpyObj<StateEvent<string, Store<BowlingState>>> = jasmine.createSpyObj('Event', ['emit']);
   let dialog: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj('MatDialog', ['open']);
   let dialogRef: jasmine.SpyObj<MatDialogRef<PlayerRatingDialogComponent>> = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

   let player: Player = {
      number: 0,
      name: '',
      rating: 0
   };
   let rating: BowlerRating = {
      key: 0,
      value: 'beginner'
   };

   beforeAll(() =>
   {
      Object.defineProperties(service, {
         events: {
            value: {
               getPlayers: function () { return playerEvent; },
               getRatings: function () { return event; },
               newGame: function () { return event; },
               bowl: function () { return event; },
               addPlayer: function () { return event; },
               removePlayer: function () { return event; },
               changeAllPlayersRatings: function (rating: number, players: Player[]) { return event; }
            },
            writable: true
         },
         observables: {
            value: {
               players$: of([player]),
               score$: function (playerName: string) { return of(100) },
               rating$: function (rated: number) { return of(rating) },
               ratings$: of([rating])
            },
            writable: true
         }
      });
   });

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         declarations: [
            BowlingViewComponent
         ],
         providers: [
            { provide: BowlingStateService, useValue: service },
            { provide: MatDialog, useValue: dialog }
         ],
         imports: [
            MatFormFieldModule,
            MatSelectModule,
            MatIconModule,
            MockComponent({ selector: 'app-add-player' }),
            MockComponent({ selector: 'app-title' }),
            MockComponent({ selector: 'app-game' })
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(BowlingViewComponent);
      component = fixture.componentInstance;
      dialog.open.calls.reset();
   });

   it('should create', () =>
   {

      expect(component).toBeTruthy();
   });

   describe('when ngOnInit invoked', () =>
   {
      it('should call subscribe', () =>
      {
         spyOn(service.events, 'getRatings');
         spyOn(service.events, 'getPlayers');

         component.ngOnInit();

         expect(service.events.getRatings).toHaveBeenCalledTimes(1);
         expect(service.events.getPlayers).toHaveBeenCalledTimes(1);
      });
   });

   describe('when addPlayer invoked', () =>
   {
      it('should call addPlayer', waitForAsync(() =>
      {
         spyOn(service.events, 'addPlayer');

         component.addPlayer({ name: 'player', rating: 100 });

         expect(service.events.addPlayer).toHaveBeenCalledTimes(1);
         expect(service.events.addPlayer).toHaveBeenCalledWith('player', 100, [player]);
      }));
   });

   describe('when removePlayer invoked', () =>
   {
      it('should call removePlayer', waitForAsync(() =>
      {
         spyOn(service.events, 'removePlayer');

         component.removePlayer(0);

         expect(service.events.removePlayer).toHaveBeenCalledTimes(1);
         expect(service.events.removePlayer).toHaveBeenCalledWith(0, [player]);
      }));
   });

   describe('when playGame invoked', () =>
   {
      it('should call bowl', waitForAsync(() =>
      {
         spyOn(service.events, 'bowl');

         component.playGame();

         expect(service.events.bowl).toHaveBeenCalledTimes(1);
         expect(service.events.bowl).toHaveBeenCalledWith([player]);
      }));
   });

   describe('when getScore$ invoked', () =>
   {
      it('should return score', waitForAsync(() =>
      {
         let score = component.getScore$('player');

         score.subscribe(value =>
         {
            expect(value).toBe(100);
         });
      }));
   });

   describe('when getRating$ invoked', () =>
   {
      it('should return intermediate', waitForAsync(() =>
      {
         Object.defineProperty(service.observables, 'rating$', {
            value: function (r: number) { return of({ ...rating, value: 'Intermediate' }) },
            writable: true
         });

         let rating$ = component.getRating$(0);

         rating$.subscribe(value =>
         {
            expect(value).toBe('Intermediate');
         });
      }));

      it('should return beginner with invalid rating', waitForAsync(() =>
      {
         Object.defineProperty(service.observables, 'rating$', {
            value: function (rating: number) { return of(undefined) },
            writable: true
         });

         let rating$ = component.getRating$(0);

         rating$.subscribe(value =>
         {
            expect(value).toBe('Beginner');
         });
      }));
   });

   describe('when newGame invoked', () =>
   {
      it('should call newGame', waitForAsync(() =>
      {
         spyOn(service.events, 'newGame');

         component.newGame();

         expect(service.events.newGame).toHaveBeenCalledTimes(1);
      }));
   });

   describe('when changePlayerRatings invoked', () =>
   {
      it('should call openDialog', waitForAsync(() =>
      {
         spyOn(service.events, 'changeAllPlayersRatings');
         dialog.open.and.returnValue(dialogRef);
         dialogRef.afterClosed.and.returnValue(of(100));

         component.changePlayerRatings();

         expect(dialog.open).toHaveBeenCalledTimes(1);
         expect(service.events.changeAllPlayersRatings).toHaveBeenCalledOnceWith(100, [player]);
      }));
   });
});
