import { Component, Directive, Type } from '@angular/core';

export function MockDirective(options: Component): Type<Directive>
{
   const metadata: Directive = {
      selector: options.selector,
      exportAs: options.exportAs,
      inputs: options.inputs,
      outputs: options.outputs,
      queries: options.queries
   };
   return <any>Directive(metadata)(class MockDirectiveClass { });
};

export function MockComponent(options: Component): Type<Component>
{
   const metadata: Component = {
      selector: options.selector,
      template: options.template,
      exportAs: options.exportAs,
      inputs: options.inputs,
      outputs: options.outputs,
      queries: options.queries,
      standalone: options.standalone,
   };
   return <any>Component(metadata)(class MockComponentClass { });
}