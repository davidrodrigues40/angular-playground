import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactComponent } from './fact.component';

describe('FactComponent', () =>
{
   let component: FactComponent;
   let fixture: ComponentFixture<FactComponent>;

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         imports: [
            FactComponent
         ]
      })
         .overrideComponent(FactComponent, {
            set: {
               imports: [
                  MockComponent({ selector: 'app-empty-data' })
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(FactComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});


