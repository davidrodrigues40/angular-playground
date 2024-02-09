import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Title2Component } from './title2.component';

describe('Title2Component', () =>
{
   let component: Title2Component;
   let fixture: ComponentFixture<Title2Component>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [Title2Component]
      });
      fixture = TestBed.createComponent(Title2Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
