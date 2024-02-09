import { CanvasDrawing } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCanvasComponent } from './state-canvas.component';

describe('StateCanvasComponent', () =>
{
   let component: StateCanvasComponent;
   let fixture: ComponentFixture<StateCanvasComponent>;
   const service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode', 'createCanvas']);
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
         declarations: [
            MockDirective({ selector: 'appCanvas', inputs: [], standalone: true })],
         imports: [
            StateCanvasComponent,
         ],
      })
         .overrideComponent(StateCanvasComponent, {
            set: {
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

   describe('when ngOnInit is called', () =>
   {
      it('should create canvas', () =>
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
            lineWidth: 0
         }
         component.drawing = canvas;
         service.createCanvas.and.returnValue(myCanvas);

         component.ngOnInit();

         expect(service.addNode).toHaveBeenCalledTimes(9);
         expect(service.createCanvas).toHaveBeenCalledTimes(1);

         expect(component.drawing).toEqual(myCanvas);
      });
   });
});
