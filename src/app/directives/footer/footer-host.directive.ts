import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[appFooterHost]',
   standalone: true,
})
export class FooterHostDirective {
   constructor(public readonly viewContainerRef: ViewContainerRef) { }
}
