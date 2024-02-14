import { CanvasDrawing } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataFlowCanvasComponent } from './ngrx-data-flow-canvas.component';

describe('NgrxDataFlowCanvasComponent', () =>
{
   let component: NgrxDataFlowCanvasComponent;
   let fixture: ComponentFixture<NgrxDataFlowCanvasComponent>;
   const service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode']);
   const canvas: CanvasDrawing = {
      startX: 0,
      startY: 0,
      height: 0,
      width: 0,
      lineHeight: 0,
      lineWidth: 0,
      backgroundColor: 'white',
      font: 'Arial',
      node: {
         order: 0,
         color: '',
         text: '',
         nodes: []
      }
   };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [NgrxDataFlowCanvasComponent],
      })
         .overrideComponent(NgrxDataFlowCanvasComponent, {
            set: {
               imports: [
                  MockDirective({ selector: 'appCanvas' })
               ],
               providers: [
                  { provide: CanvasService, useValue: service }
               ]
            }
         });
      fixture = TestBed.createComponent(NgrxDataFlowCanvasComponent);
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

         expect(service.addNode).toHaveBeenCalledTimes(5);
         expect(component.drawing).toBeDefined();
      });
   });
});
