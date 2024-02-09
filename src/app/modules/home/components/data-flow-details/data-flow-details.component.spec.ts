import { Title2Component } from 'src/app/components/title2/title2.component';

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
                  Title2Component]
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
