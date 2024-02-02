import { filter, Subject, tap } from 'rxjs';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FooterHostDirective } from './components/footer/footer-host.directive';
import { FooterComponentFactory, FooterTypes } from './services/footer/footer.service';

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
            tap(event => console.log(event)))
         .subscribe(event => this.loadComponent((event as NavigationEnd).urlAfterRedirects));
   }

   ngOnDestroy(): void
   {
      this._destroy$.next();
      this._destroy$.complete();
   }

   private loadComponent(url: string): void
   {
      const component = FooterComponentFactory[url as FooterTypes];
      this._footer.viewContainerRef.clear();

      if (component)
         this._footer?.viewContainerRef.createComponent(component);
      else
         this._footer?.viewContainerRef.createComponent(FooterComponentFactory[FooterTypes.default]);
   }
}