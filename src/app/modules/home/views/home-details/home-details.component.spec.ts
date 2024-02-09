import { Title2Component } from 'src/app/components/title2/title2.component';
import { Title3Component } from 'src/app/components/title3/title3.component';
import { Title4Component } from 'src/app/components/title4/title4.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailsComponent } from './home-details.component';

describe('HomeDetailsComponent', () =>
{
   let component: HomeDetailsComponent;
   let fixture: ComponentFixture<HomeDetailsComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [HomeDetailsComponent],
         imports: [
            Title2Component,
            Title3Component,
            Title4Component
         ]
      });
      fixture = TestBed.createComponent(HomeDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
