import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDataComponent } from './empty-data.component';

describe('EmptyDataComponent', () =>
{
   let component: EmptyDataComponent;
   let fixture: ComponentFixture<EmptyDataComponent>;

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         imports: [EmptyDataComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(EmptyDataComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
