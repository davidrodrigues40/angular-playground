import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxViewComponent } from './ngrx-view.component';
import { provideRouter } from '@angular/router';

describe('NgrxViewComponent', () => {
   let component: NgrxViewComponent;
   let fixture: ComponentFixture<NgrxViewComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [
            NgrxViewComponent
         ],
         providers: [provideRouter([])],
      });
      fixture = TestBed.createComponent(NgrxViewComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
