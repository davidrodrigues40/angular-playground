import { Component, EnvironmentInjector, Inject, inject } from '@angular/core';

import { SignalObject } from '../interfaces/models/signal-object';

@Component({
   selector: 'app-book-list',
   template: '',
   standalone: true
})
export class MockBookListComponent { }

@Component({
   selector: 'app-test-signal-component',
   template: '',
   standalone: true
})
export class MockSignalComponent
{
   private injector = inject(EnvironmentInjector);

   constructor(
      @Inject('signal') public signal: SignalObject<any>,
      @Inject('effectName') public effectName: string,
      @Inject('service') public service: any)
   {
      this.runEffect();
   }

   runEffect(): void
   {
      const innerEffect = this.service.effects[this.effectName];
      if (innerEffect instanceof Function)
         innerEffect(this.signal);
   }
}