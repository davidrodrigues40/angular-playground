import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxDetailsComponent } from '../../components/ngrx-details/ngrx-details.component';
import { NgrxViewComponent } from './ngrx-view.component';

describe('NgrxViewComponent', () =>
{
   let component: NgrxViewComponent;
   let fixture: ComponentFixture<NgrxViewComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [NgrxViewComponent],
         imports: [NgrxDetailsComponent]
      });
      fixture = TestBed.createComponent(NgrxViewComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
