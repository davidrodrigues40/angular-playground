import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataFlowComponent } from './ngrx-data-flow.component';

describe('NgrxDataFlowComponent', () =>
{
   let component: NgrxDataFlowComponent;
   let fixture: ComponentFixture<NgrxDataFlowComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [NgrxDataFlowComponent]
      }).overrideComponent(NgrxDataFlowComponent, {
         set: {
            imports: [
               MockComponent({ selector: 'app-ngrx-data-flow-canvas', template: '', standalone: true }),
               MockComponent({ selector: 'app-title2', template: '', standalone: true })
            ]
         }
      });

      fixture = TestBed.createComponent(NgrxDataFlowComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
