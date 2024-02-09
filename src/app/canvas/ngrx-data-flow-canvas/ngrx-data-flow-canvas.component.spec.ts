import { CanvasDrawing } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataFlowCanvasComponent } from './ngrx-data-flow-canvas.component';

describe('NgrxDataFlowCanvasComponent', () =>
{
   let component: NgrxDataFlowCanvasComponent;
   let fixture: ComponentFixture<NgrxDataFlowCanvasComponent>;
   const service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode', 'createCanvas']);
   const canvas: CanvasDrawing = {
      startX: 0,
      startY: 0,
      height: 0,
      width: 0,
      lineHeight: 0,
      lineLength: 0,
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
         declarations: [MockDirective({ selector: 'appCanvas', standalone: true })],
         imports: [NgrxDataFlowCanvasComponent],
      })
         .overrideComponent(NgrxDataFlowCanvasComponent, {
            set: {
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
         const myCanvas: CanvasDrawing = {
            height: 10,
            width: 20,
            startX: 10,
            startY: 20,
            lineHeight: 10,
            backgroundColor: 'black',
            font: 'Verdanal',
            node: {
               order: 0,
               color: '',
               text: '',
               nodes: []
            },
            lineLength: 0
         }
         component.drawing = canvas;
         service.createCanvas.and.returnValue(myCanvas);

         component.ngOnInit();

         expect(component.drawing).toBeDefined();
         expect(component.drawing).toEqual(myCanvas);

      });
   });
});
