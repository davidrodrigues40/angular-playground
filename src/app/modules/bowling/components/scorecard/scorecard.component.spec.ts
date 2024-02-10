import { Bowler } from 'src/app/interfaces/models/bowling/bowler';
import { Frame } from 'src/app/interfaces/models/bowling/frame';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameService } from '../../services/frame.service';
import { BowlerComponent } from './scorecard.component';

describe('ScorecardComponent', () =>
{
   let component: BowlerComponent;
   let fixture: ComponentFixture<BowlerComponent>;
   let frameService: jasmine.SpyObj<FrameService> = jasmine.createSpyObj('FrameService', ['calculateFrameValue']);
   const frame: Frame = {
      rolls: new Map<number, number>(),
      score: 0
   };
   const frames: Frame[] = [frame];
   const bowler: Bowler = {
      frames: Object.fromEntries(frames.map((frame, index) => [index, frame])) as unknown as Map<number, Frame>,
      score: 0,
      number: 0,
      name: '',
      rating: 0
   };

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         declarations: [BowlerComponent],
         providers: [
            { provide: FrameService, useValue: frameService }
         ]
      })
         .overrideComponent(BowlerComponent, {
            set: {
               providers: [
                  { provide: FrameService, useValue: frameService }
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(BowlerComponent);
      component = fixture.componentInstance;

      component.bowler = bowler;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit invoked', () =>
   {
      it('should set frames', () =>
      {
         component.ngOnInit();

         expect(component.frames).toEqual([frame]);
      });
   });

   describe('when frameScore invoked', () =>
   {
      beforeEach(() =>
      {
         frameService.calculateFrameValue.calls.reset();
      });
      it('should return value from frame service', () =>
      {
         frameService.calculateFrameValue.and.returnValue(0);
         component.frames = frames;

         const result = component.frameScore(5, 6);

         expect(result).toEqual(0);
         expect(frameService.calculateFrameValue).toHaveBeenCalledOnceWith(5, 6, [frame]);
      });
   });
});
