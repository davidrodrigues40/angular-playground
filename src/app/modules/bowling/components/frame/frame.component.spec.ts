import { Frame } from 'src/app/interfaces/models/bowling/frame';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameService } from '../../services/frame.service';
import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
   let component: FrameComponent;
   let fixture: ComponentFixture<FrameComponent>;
   let service: jasmine.SpyObj<FrameService> = jasmine.createSpyObj('FrameService', ['getFrameValues']);
   let mapRolls: Map<number, number> = new Map<number, number>();
   let arrayRolls: { [key: number]: number } = Object.fromEntries(mapRolls);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [],
         providers: [
            FrameComponent,
            { provide: FrameService, useValue: service }
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(FrameComponent);
      component = fixture.componentInstance;

      service.getFrameValues.calls.reset();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when rolls invoked', () => {
      it('should call frameService.getFrameValues from map', () => {
         const frame: Frame = {
            rolls: mapRolls,
            score: 0
         };

         component.rolls(frame);

         expect(service.getFrameValues).toHaveBeenCalledOnceWith(Array.from(frame.rolls.values()));
      });

      it('should call frameService.getFrameValues from array', () => {
         const frame: Frame = {
            rolls: arrayRolls as any as Map<number, number>,
            score: 0
         };

         component.rolls(frame);

         expect(service.getFrameValues).toHaveBeenCalledOnceWith(Object.values(frame.rolls));
      });
   });
});
