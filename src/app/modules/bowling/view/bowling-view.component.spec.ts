import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BowlingState } from 'src/app/state/app.state';
import { Player } from 'src/app/state/bowling/models/player.model';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';
import { StateEvent } from 'src/app/state/common/state-event';
import { PlayerRatingDialogComponent } from '../components/player-rating-dialog/player-rating-dialog.component';
import { BowlerRating } from '../models/bowler-rating.model';
import { BowlingViewComponent } from './bowling-view.component';

describe('BowlingViewComponent', () =>
{
    let component: BowlingViewComponent;
    let fixture: ComponentFixture<BowlingViewComponent>;
    let service: jasmine.SpyObj<BowlingStateService> = jasmine.createSpyObj('BowlingStateService', ['events', 'observables']);
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

    @Component({
        selector: 'app-add-player',
        template: ''
    })
    class MockAddPlayerComponent { };
    @Component({
        selector: 'app-game',
        template: ''
    })
    class MockGameComponent { };

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [
                BowlingViewComponent,
                MockAddPlayerComponent,
                MockGameComponent
            ],
            providers: [
                { provide: BowlingStateService, useValue: service },
                { provide: MatDialog, useValue: dialog }
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
                    getPlayers: function () { return playerEvent; },
                    getRatings: function () { return event; },
                    newGame: function () { return event; },
                    bowl: function () { return event; },
                    addPlayer: function () { return event; },
                    removePlayer: function () { return event; },
                    changeAllPlayersRatings: function (rating: number, players: Player[]) { return event; }
                }
            },
            observables: {
                value: {
                    players$: of([player]),
                    score$: function (playerName: string) { return of(100) },
                    rating$: function (rated: number) { return of(rating) },
                    ratings$: of([rating])
                }
            }
        });
        event.emit.calls.reset();
    });

    it('should create', () =>
    {

        expect(component).toBeTruthy();
    });

    describe('when ngOnInit invoked', () =>
    {
        it('should call subscribe', () =>
        {
            component.ngOnInit();

            expect(event.emit).toHaveBeenCalledTimes(1);
            expect(playerEvent.emit).toHaveBeenCalledTimes(1);
        });
    });

    describe('when addPlayer invoked', () =>
    {
        it('should call emit', waitForAsync(() =>
        {

            component.addPlayer(player);

            expect(service.events.addPlayer(player.name, player.rating, [player]).emit).toHaveBeenCalledTimes(1);
        }));
    });

    describe('when removePlayer invoked', () =>
    {
        it('should call emit', waitForAsync(() =>
        {

            component.removePlayer(1);

            expect(service.events.removePlayer(1, [player]).emit).toHaveBeenCalledTimes(1);
        }));
    });

    describe('when playGame invoked', () =>
    {
        it('should call emit', waitForAsync(() =>
        {

            component.playGame();

            expect(service.events.newGame().emit).toHaveBeenCalledTimes(1);
        }));
    });

    describe('when getScore$ invoked', () =>
    {
        it('should return score$', () =>
        {

            component.getScore$('john')
                .subscribe(score =>
                {
                    expect(score).toBe(100);
                });
        });
    });

    describe('when getRating$ invoked', () =>
    {
        it('should return rating$', () =>
        {

            component.getRating$(0)
                .subscribe(rating =>
                {
                    expect(rating).toBe('beginner');
                });
        });

        it('should return default Beginner', () =>
        {
            Object.defineProperty(service, 'observables', { value: { rating$: function (rated: number) { return of(null) } } });

            component.getRating$(1)
                .subscribe(rating =>
                {
                    expect(rating).toBe('Beginner');
                });
        })
    });

    describe('when new game invoked', () =>
    {
        it('should call emit', waitForAsync(() =>
        {

            component.newGame();

            expect(service.events.newGame().emit).toHaveBeenCalledTimes(1);
        }));
    });

    describe('when changePlayerRatings invoked', () =>
    {
        beforeEach(() =>
        {
            dialog.open.calls.reset();
            dialogRef.afterClosed.calls.reset();

            dialogRef.afterClosed.and.returnValue(of(1));
            dialog.open.and.returnValue(dialogRef);
        });
        it('should call openDialog', waitForAsync(() =>
        {
            component.changePlayerRatings();

            expect(dialog.open).toHaveBeenCalledTimes(1);
        }));

        it('should call ratingChanged', waitForAsync(() =>
        {
            spyOn(service.events, 'changeAllPlayersRatings').and.returnValue(event);
            component.changePlayerRatings();

            expect(event.emit).toHaveBeenCalledTimes(1);
            expect(service.events.changeAllPlayersRatings).toHaveBeenCalledOnceWith(1, [player]);
        }));
    });
});
