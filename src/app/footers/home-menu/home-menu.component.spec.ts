import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'src/app/testing/testing.directive';
import { HomeMenuComponent } from './home-menu.component';
import { provideRouter, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';

describe('HomeMenuComponent', () => {
   let component: HomeMenuComponent;
   let fixture: ComponentFixture<HomeMenuComponent>;
   const menuService: jasmine.SpyObj<MenuService> = jasmine.createSpyObj<MenuService>('menu-service', ['getMenu']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HomeMenuComponent]
      })
         .overrideComponent(HomeMenuComponent, {
            set: {
               imports: [
                  CommonModule,
                  MockComponent({ selector: 'app-base-footer', inputs: ['item'] })
               ],
               providers: [
                  { provide: Router, useValue: provideRouter([]) },
                  { provide: MenuService, useValue: menuService }
               ]
            }
         });
      fixture = TestBed.createComponent(HomeMenuComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () => {
      it('should bind menu and call fetchMenu', () => {
         component.ngOnInit();

         expect(menuService.getMenu).toHaveBeenCalled();
      });
   });

   describe('when markDisabled is called', () => {
      it('should return true when route is the same as the current route', () => {
         Object.defineProperty(component.router, 'url', { value: '/test' });

         expect(component.markDisabled('test')).toBeTrue();
      });

      it('should return false when route is different from the current route', () => {
         Object.defineProperty(component.router, 'url', { value: '/test2' });

         expect(component.markDisabled('test3')).toBeFalse();
      });
   })
});
