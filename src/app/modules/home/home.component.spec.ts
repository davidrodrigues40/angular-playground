import { TitleComponent } from 'src/app/components/title/title.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () =>
{
   let component: HomeComponent;
   let fixture: ComponentFixture<HomeComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         declarations: [HomeComponent],
         imports: [
            TitleComponent,
            RouterTestingModule
         ]
      });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
