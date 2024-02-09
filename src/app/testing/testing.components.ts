import { Component, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';

import { SignalObject } from '../interfaces/models/signal-object';
import { ISignalStateService } from '../interfaces/services/signal-state-service.interface';

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

   run(signal: SignalObject<any>, effectName: string, service: ISignalStateService): void
   {
      const innerEffect = service.effects[effectName];
      if (innerEffect instanceof Function)
         runInInjectionContext(this.injector, () => innerEffect(signal));
   }
}

@Component({
   selector: 'app-base-footer',
   template: '',
   standalone: true
})
export class MockBaseFooterComponent { }