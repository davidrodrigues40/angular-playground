import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { MenuService } from 'src/app/services/menu/menu.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
   let component: MenuComponent;
   let fixture: ComponentFixture<MenuComponent>;
   let signalService: jasmine.SpyObj<MenuService> = jasmine.createSpyObj<MenuService>('signal-service', ['getMenu']);
   const menu: MenuItem[] = [];

   beforeAll(() => {
      Object.defineProperties(signalService, {
         observables: {
            value: {
               menu: menu
            }
         }
      });
   });

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [MenuComponent],
         imports: [
            MatIconModule,
            MatMenuModule
         ]
      })
         .overrideComponent(MenuComponent, {
            set: {
               providers: [
                  { provide: MenuService, useValue: signalService }
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit', () => {
      it('should call getMenu', () => {
         component.ngOnInit();

         expect(signalService.getMenu).toHaveBeenCalledTimes(1);
      });
   });
});
