import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BowlingState } from 'src/app/state/app.state';
import { Player } from 'src/app/state/bowling/models/player.model';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';
import { Event } from 'src/app/state/common/event';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { GameComponent } from '../components/game/game.component';
import { BowlerRating } from '../models/bowler-rating.model';
import { BowlingViewComponent } from './bowling-view.component';

describe('BowlingViewComponent', () => {
  let component: BowlingViewComponent;
  let fixture: ComponentFixture<BowlingViewComponent>;
  let service: jasmine.SpyObj<BowlingStateService> = jasmine.createSpyObj('BowlingStateService', ['events', 'observables']);
  let event: jasmine.SpyObj<Event<string, Store<BowlingState>>> = jasmine.createSpyObj('Event', ['emit']);
  let player: Player = {
    number: 0,
    name: '',
    rating: 0
  };
  let rating: BowlerRating = {
    key: 0,
    value: 'beginner'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BowlingViewComponent,
        AddPlayerComponent,
        GameComponent],
      providers: [
        { provide: BowlingStateService, useValue: service }
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BowlingViewComponent);
    component = fixture.componentInstance;

    Object.defineProperties(service, {
      events: {
        value: {
          getRatings: function () { return event; },
          newGame: function () { return event; },
          bowl: function () { return event; },
          addPlayer: function () { return event; },
          removePlayer: function () { return event; }
        }
      },
      observables: {
        value: {
          players$: of([player]),
          score$: function (playerName: string) { return of(100) },
          rating$: function (rated: number) { return of(rating) }
        }
      }
    });

    event.emit.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when ngOnInit invoked', () => {
    it('should call subscribe', () => {
      component.ngOnInit();

      expect(service.events.getRatings().emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when addPlayer invoked', () => {
    it('should call emit', waitForAsync(() => {

      component.addPlayer(player);

      expect(service.events.addPlayer(player.name, player.rating, [player]).emit).toHaveBeenCalledTimes(1);
    }));
  });

  describe('when removePlayer invoked', () => {
    it('should call emit', waitForAsync(() => {

      component.removePlayer(1);

      expect(service.events.removePlayer(1, [player]).emit).toHaveBeenCalledTimes(1);
    }));
  });

  describe('when playGame invoked', () => {
    it('should call emit', waitForAsync(() => {

      component.playGame();

      expect(service.events.newGame().emit).toHaveBeenCalledTimes(1);
    }));
  });

  describe('when getScore$ invoked', () => {
    it('should return score$', () => {

      component.getScore$('john')
        .subscribe(score => {
          expect(score).toBe(100);
        });
    });
  });

  describe('when getRating$ invoked', () => {
    it('should return rating$', () => {

      component.getRating$(0)
        .subscribe(rating => {
          expect(rating).toBe('beginner');
        });
    });

    it('should return default Beginner', () => {
      Object.defineProperty(service, 'observables', { value: { rating$: function (rated: number) { return of(null) } } });

      component.getRating$(1)
        .subscribe(rating => {
          expect(rating).toBe('Beginner');
        });
    })
  });

  describe('when new game invoked', () => {
    it('should call emit', waitForAsync(() => {

      component.newGame();

      expect(service.events.newGame().emit).toHaveBeenCalledTimes(1);
    }));
  })
});
