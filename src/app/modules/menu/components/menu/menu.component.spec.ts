import { MenuItem } from 'src/app/interfaces/models/menu/menu-item';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuSignalService } from 'src/app/state/menu/service/menu-signal.service';
import { TestingSpys } from 'src/app/testing/testing.spys';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () =>
{
   let component: MenuComponent;
   let fixture: ComponentFixture<MenuComponent>;
   let signalService: jasmine.SpyObj<MenuSignalService> = TestingSpys.signalService<MenuSignalService>(['bindMenu'], ['fetchMenu']);
   let service: jasmine.SpyObj<MenuService> = jasmine.createSpyObj('MenuService', ['dispatch']);
   const menu: MenuItem[] = [];

   beforeAll(() =>
   {
      Object.defineProperties(signalService, {
         observables: {
            value: {
               menu: menu
            }
         }
      });
   });

   beforeEach(async () =>
   {
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
                  { provide: MenuSignalService, useValue: signalService },
                  { provide: MenuService, useValue: service }
               ]
            }
         })
         .compileComponents();

      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;

   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('when ngOnInit', () =>
   {
      it('should call fetchMenu', () =>
      {
         component.ngOnInit();

         expect(signalService.events.fetchMenu).toHaveBeenCalledTimes(1);
      });
   });
});
