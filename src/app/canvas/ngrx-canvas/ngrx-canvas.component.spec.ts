import { CanvasService } from 'src/app/services/canvas/canvas.service';
import { MockDirective } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxCanvasComponent } from './ngrx-canvas.component';

describe('NgrxCanvasComponent', () =>
{
   let component: NgrxCanvasComponent;
   let fixture: ComponentFixture<NgrxCanvasComponent>;
   let service: jasmine.SpyObj<CanvasService> = jasmine.createSpyObj('CanvasService', ['addNode', 'createCanvas']);

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [
            MockDirective({ selector: 'appCanvas', standalone: true })
         ],
         imports: [
            NgrxCanvasComponent
         ],
      })
         .overrideComponent(NgrxCanvasComponent, {
            set: {
               providers: [
                  { provide: CanvasService, useValue: service },
               ]
            }
         });
      fixture = TestBed.createComponent(NgrxCanvasComponent);
      component = fixture.componentInstance;

      service.addNode.calls.reset();
      service.createCanvas.calls.reset();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit is called', () =>
   {
      it('should create canvas', () =>
      {
         component.ngOnInit();

         expect(service.addNode).toHaveBeenCalledTimes(6);
         expect(service.createCanvas).toHaveBeenCalledTimes(1);
      });
   });
});
