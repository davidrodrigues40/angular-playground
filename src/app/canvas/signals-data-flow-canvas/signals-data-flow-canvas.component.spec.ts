import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsDataFlowCanvasComponent } from './signals-data-flow-canvas.component';
import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

describe('SignalsDataFlowCanvasComponent', () => {
   let component: SignalsDataFlowCanvasComponent;
   let fixture: ComponentFixture<SignalsDataFlowCanvasComponent>;
   const service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode', 'createCanvas']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [
            SignalsDataFlowCanvasComponent,
            MockDirective({ selector: 'appCanvas', inputs: [], standalone: true }),
         ]
      }).overrideComponent(SignalsDataFlowCanvasComponent, {
         set: {
            providers: [
               { provide: CanvasService, useValue: service }
            ]
         }
      });
      fixture = TestBed.createComponent(SignalsDataFlowCanvasComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit is called', () => {
      it('should create canvas', () => {
         Object.defineProperty(component, 'drawing', { writable: true, value: undefined })

         component.ngOnInit();

         expect(service.addNode).toHaveBeenCalledTimes(9);
         expect(component.drawing).toBeDefined();
      });
   });
});
