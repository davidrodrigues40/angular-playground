import { Title3Component } from 'src/app/components/title3/title3.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDetailsComponent } from './state-details.component';

describe('StateDetailsComponent', () =>
{
   let component: StateDetailsComponent;
   let fixture: ComponentFixture<StateDetailsComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [
            StateDetailsComponent,
            Title3Component]
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
