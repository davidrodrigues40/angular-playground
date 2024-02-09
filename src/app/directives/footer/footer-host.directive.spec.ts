import { ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FooterHostDirective } from './footer-host.directive';

describe('FooterHostDirective', () =>
{
   let directive: FooterHostDirective;
   let viewContainerRef: jasmine.SpyObj<ViewContainerRef> = jasmine.createSpyObj('ViewContainerRef', ['clear', 'createEmbeddedView', 'element', 'get', 'insert', 'length', 'length', 'move', 'remove', 'indexOf']);
   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            FooterHostDirective,
            { provide: ViewContainerRef, useValue: viewContainerRef }
         ]
      });
      directive = new FooterHostDirective(viewContainerRef);
   });

   it('should create an instance', () =>
   {
      TestBed.inject(FooterHostDirective);

      expect(directive).toBeTruthy();
   });
});
