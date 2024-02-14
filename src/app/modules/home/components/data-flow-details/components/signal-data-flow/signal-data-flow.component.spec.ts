import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDataFlowComponent } from './signal-data-flow.component';
import { MockComponent } from 'src/app/testing/testing.directive';

describe('SignalDataFlowComponent', () =>
{
   let component: SignalDataFlowComponent;
   let fixture: ComponentFixture<SignalDataFlowComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [
            SignalDataFlowComponent,
            MockComponent({ selector: 'app-title2' }),
            MockComponent({ selector: 'app-signals-data-flow-canvas' })
         ]
      });
      fixture = TestBed.createComponent(SignalDataFlowComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
