import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxCanvasComponent } from './ngrx-canvas.component';

describe('NgrxCanvasComponent', () => {
   let component: NgrxCanvasComponent;
   let fixture: ComponentFixture<NgrxCanvasComponent>;
   let service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [
            NgrxCanvasComponent
         ],
      })
         .overrideComponent(NgrxCanvasComponent, {
            set: {
               imports: [
                  MockDirective({ selector: 'appCanvas' })
               ],
               providers: [
                  { provide: CanvasService, useValue: service },
               ]
            }
         });
      fixture = TestBed.createComponent(NgrxCanvasComponent);
      component = fixture.componentInstance;

      service.addNode.calls.reset();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit is called', () => {
      it('should create canvas', () => {
         Object.defineProperty(component, 'drawing', { writable: true, value: undefined });

         component.ngOnInit();

         expect(service.addNode).toHaveBeenCalledTimes(6);
         expect(component.drawing).toBeDefined();
      });
   });
});
