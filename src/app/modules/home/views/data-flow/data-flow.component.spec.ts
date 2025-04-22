import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFlowComponent } from './data-flow.component';
import { provideRouter } from '@angular/router';

describe('DataFlowComponent', () => {
   let component: DataFlowComponent;
   let fixture: ComponentFixture<DataFlowComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [DataFlowComponent],
         providers: [provideRouter([])],
      });
      fixture = TestBed.createComponent(DataFlowComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
