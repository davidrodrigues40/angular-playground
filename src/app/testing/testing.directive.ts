import { Component, Directive, ElementRef, Type } from '@angular/core';

export function MockDirective(options: Component): Type<Directive> {
   const metadata: Directive = {
      selector: options.selector,
      exportAs: options.exportAs,
      inputs: options.inputs,
      outputs: options.outputs,
      queries: options.queries,
      standalone: options.standalone ?? true,
   };
   return <any>Directive(metadata)(class MockDirective {
      private readonly _elementRef: ElementRef | undefined;

      get element(): ElementRef | undefined {
         return this._elementRef;
      }
   });
};

export function MockComponent(options: Component): Type<Component> {
   const metadata: Component = {
      selector: options.selector,
      template: options.template ?? '',
      exportAs: options.exportAs,
      inputs: options.inputs,
      outputs: options.outputs,
      queries: options.queries,
      standalone: options.standalone ?? true,
   };
   return <any>Component(metadata)(class MockComponent {
      private readonly _elementRef: ElementRef | undefined;

      get element(): ElementRef | undefined {
         return this._elementRef;
      }
   });
}