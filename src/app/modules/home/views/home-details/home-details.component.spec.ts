import { MockComponent } from 'src/app/testing/testing.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailsComponent } from './home-details.component';

describe('HomeDetailsComponent', () => {
   let component: HomeDetailsComponent;
   let fixture: ComponentFixture<HomeDetailsComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [HomeDetailsComponent],
         imports: [
            MockComponent({ selector: 'app-title2', template: '', standalone: true }),
            MockComponent({ selector: 'app-title3', template: '', standalone: true }),
            MockComponent({ selector: 'app-title4', template: '', standalone: true })
         ]
      });
      fixture = TestBed.createComponent(HomeDetailsComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
