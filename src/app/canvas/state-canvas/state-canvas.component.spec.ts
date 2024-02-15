import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCanvasComponent } from './state-canvas.component';

describe('NgrxDataFlowCanvasComponent', () =>
{
   let component: StateCanvasComponent;
   let fixture: ComponentFixture<StateCanvasComponent>;
   const service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode']);

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [StateCanvasComponent],
      })
         .overrideComponent(StateCanvasComponent, {
            set: {
               imports: [
                  MockDirective({ selector: 'appCanvas' })
               ],
               providers: [
                  { provide: CanvasService, useValue: service }
               ]
            }
         });
      fixture = TestBed.createComponent(StateCanvasComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () =>
   {
      it('should set drawing', () =>
      {
         Object.defineProperty(component, 'drawing', { writable: true, value: undefined });

         component.ngOnInit();

         expect(service.addNode).toHaveBeenCalledTimes(9);
         expect(component.drawing).toBeDefined();
      });
   });
});
