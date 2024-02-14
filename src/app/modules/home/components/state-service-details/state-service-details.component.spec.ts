import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateServiceDetailsComponent } from './state-service-details.component';

describe('StateServiceDetailsComponent', () =>
{
   let component: StateServiceDetailsComponent;
   let fixture: ComponentFixture<StateServiceDetailsComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [StateServiceDetailsComponent]
      })
         .overrideComponent(StateServiceDetailsComponent, {
            set: {
               imports: [
                  MockComponent({ selector: 'app-state-canvas', template: '', standalone: true }),
               ]
            }
         });
      fixture = TestBed.createComponent(StateServiceDetailsComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
