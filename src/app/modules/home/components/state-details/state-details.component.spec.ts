import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDetailsComponent } from './state-details.component';

describe('StateDetailsComponent', () =>
{
   let component: StateDetailsComponent;
   let fixture: ComponentFixture<StateDetailsComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [StateDetailsComponent]
      })
         .overrideComponent(StateDetailsComponent, {
            set: {
               imports: [MockComponent({ selector: 'app-title3', template: '', standalone: true })]
            }
         });
      fixture = TestBed.createComponent(StateDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
