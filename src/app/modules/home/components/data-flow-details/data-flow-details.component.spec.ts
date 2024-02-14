import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDataFlowComponent } from './components/ngrx-data-flow/ngrx-data-flow.component';
import { DataFlowDetailsComponent } from './data-flow-details.component';

describe('DataFlowDetailsComponent', () =>
{
   let component: DataFlowDetailsComponent;
   let fixture: ComponentFixture<DataFlowDetailsComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [DataFlowDetailsComponent]
      })
         .overrideComponent(DataFlowDetailsComponent, {
            set: {
               imports: [
                  NgrxDataFlowComponent,
                  MockComponent({ selector: 'app-title2', standalone: true }),
                  MockComponent({ selector: 'app-signal-data-flow', standalone: true })
               ]
            }
         });

      fixture = TestBed.createComponent(DataFlowDetailsComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
