import { filter, Subject } from 'rxjs';

import { Component, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FooterHostDirective } from './directives/footer/footer-host.directive';
import
{
   FooterComponentFactory,
   FooterComponentType,
   FooterTypes
} from './factories/footer.factory';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy
{
   private _destroy$ = new Subject<void>();
   @ViewChild(FooterHostDirective, { static: true }) private _footer!: FooterHostDirective;

   constructor(
      private readonly _router: Router) { }

   ngOnInit(): void
   {
      this._router.events
         .pipe(
            filter((event) => event instanceof NavigationEnd),
         )
         .subscribe(event => this.loadFooter((event as NavigationEnd).urlAfterRedirects));
   }

   ngOnDestroy(): void
   {
      this._destroy$.next();
      this._destroy$.complete();
   }

   private loadFooter(url: string): void
   {
      const component: Type<FooterComponentType> = FooterComponentFactory[url as FooterTypes];
      this._footer.viewContainerRef.clear();

      if (component)
         this._footer?.viewContainerRef.createComponent(component);
      else
         this._footer?.viewContainerRef.createComponent(FooterComponentFactory[FooterTypes.default]);
   }
}