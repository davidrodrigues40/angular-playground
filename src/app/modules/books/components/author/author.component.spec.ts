import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorComponent } from './author.component';

describe('AuthorComponent', () =>
{
   let component: AuthorComponent;
   let fixture: ComponentFixture<AuthorComponent>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [AuthorComponent]
      });
      fixture = TestBed.createComponent(AuthorComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
