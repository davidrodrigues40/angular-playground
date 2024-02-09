import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFlowDetailsComponent } from '../../components/data-flow-details/data-flow-details.component';
import { DataFlowComponent } from './data-flow.component';

describe('DataFlowComponent', () =>
{
   let component: DataFlowComponent;
   let fixture: ComponentFixture<DataFlowComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [DataFlowComponent],
         imports: [DataFlowDetailsComponent]
      });
      fixture = TestBed.createComponent(DataFlowComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
