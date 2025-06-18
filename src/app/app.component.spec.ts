import { of } from 'rxjs';

import { Component, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterHostDirective } from './directives/footer/footer-host.directive';
import { MockComponent } from './testing/testing.directive';

describe('AppComponent', () => {
   let fixture: ComponentFixture<AppComponent>;
   let component: AppComponent;
   const router: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [], ['events']);
   const navEnd: NavigationEnd = new NavigationEnd(0, '/home', '/home');
   const child: jasmine.SpyObj<FooterHostDirective> = jasmine.createSpyObj('FooterHostDirective', [], ['viewContainerRef']);
   const containerRef: jasmine.SpyObj<ViewContainerRef> = jasmine.createSpyObj('ViewContainerRef', ['clear', 'createComponent']);
   let events = of(navEnd);

   @Component({ selector: 'app-menu', template: '' })
   class MenuStubComponent { }

   beforeAll(() => {
      Object.defineProperty(child, 'viewContainerRef', { value: containerRef });
   });

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [
            AppComponent
         ],
         imports: [
            FooterHostDirective,
            RouterModule.forRoot([]),
            MockComponent({ selector: 'app-menu', inputs: ['menu'], standalone: true }),
         ],
         providers: [
            { provide: Router, useValue: router }
         ]
      });
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      component['_footer'] = child;
      containerRef.clear.calls.reset();
      containerRef.createComponent.calls.reset();
   });

   it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
   });

   describe('ngOnInit', () => {
      it('should call loadFooter with the correct URL', () => {
         navEnd.urlAfterRedirects = '/home';
         Object.defineProperty(router, 'events', { value: events });

         component.ngOnInit();

         expect(child.viewContainerRef.clear).toHaveBeenCalledTimes(1);
         expect(child.viewContainerRef.createComponent).toHaveBeenCalledTimes(1);
      });

      it('should load default footer if URL is not found', () => {
         navEnd.urlAfterRedirects = '/not-found';
         Object.defineProperty(router, 'events', { value: events });

         component.ngOnInit();

         expect(child.viewContainerRef.clear).toHaveBeenCalledTimes(1);
         expect(child.viewContainerRef.createComponent).toHaveBeenCalledTimes(1);
      });
   });
});
