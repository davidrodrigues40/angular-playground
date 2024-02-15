import { HomeMenuSignalService } from 'src/app/state/home-menu/services/home-menu-signal.service';
import { TestingSpys } from 'src/app/testing/testing.spys';

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'src/app/testing/testing.directive';
import { HomeMenuComponent } from './home-menu.component';

describe('HomeMenuComponent', () =>
{
   let component: HomeMenuComponent;
   let fixture: ComponentFixture<HomeMenuComponent>;
   const signalService: jasmine.SpyObj<HomeMenuSignalService> = TestingSpys.signalService<HomeMenuSignalService>(['bindMenu'], ['fetchMenu']);

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [HomeMenuComponent]
      })
         .overrideComponent(HomeMenuComponent, {
            set: {
               imports: [
                  CommonModule,
                  RouterTestingModule,
                  MockComponent({ selector: 'app-base-footer', inputs: ['item'] })
               ],
               providers: [
                  { provide: HomeMenuSignalService, useValue: signalService }
               ]
            }
         });
      fixture = TestBed.createComponent(HomeMenuComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () =>
   {
      it('should bind menu and call fetchMenu', () =>
      {
         component.ngOnInit();

         expect(signalService.effects.bindMenu).toHaveBeenCalledWith(component.menuItems);
         expect(signalService.methods.fetchMenu).toHaveBeenCalled();
      });
   });

   describe('when markDisabled is called', () =>
   {
      it('should return true when route is the same as the current route', () =>
      {
         Object.defineProperty(component.router, 'url', { value: '/test' });

         expect(component.markDisabled('test')).toBeTrue();
      });

      it('should return false when route is different from the current route', () =>
      {
         Object.defineProperty(component.router, 'url', { value: '/test2' });

         expect(component.markDisabled('test3')).toBeFalse();
      });
   })
});
