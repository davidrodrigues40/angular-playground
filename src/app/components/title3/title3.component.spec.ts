import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Title3Component } from './title3.component';

describe('SubSubTitleComponent', () =>
{
   let component: Title3Component;
   let fixture: ComponentFixture<Title3Component>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [Title3Component]
      });
      fixture = TestBed.createComponent(Title3Component);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
