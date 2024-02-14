import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () =>
{
   let component: MenuItemComponent;
   let fixture: ComponentFixture<MenuItemComponent>;

   beforeEach(async () =>
   {
      await TestBed.configureTestingModule({
         declarations: [MenuItemComponent],
         imports: [
            RouterTestingModule
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(MenuItemComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });
});
