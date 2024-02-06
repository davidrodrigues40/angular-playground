import { SignalObject } from 'src/app/interfaces/models/signal-object';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BaseFooter } from '../base-footer.component';

@Component({
   selector: 'app-chuck-norris-footer',
   templateUrl: './chuck-norris-footer.component.html',
   imports: [
      CommonModule,
      BaseFooter],
   standalone: true
})
export class ChuckNorrisFooterComponent implements OnInit
{
   fact: SignalObject<ChuckNorrisFact | null> = { value: this._service.observables.footerFact };
   constructor(private readonly _service: ChuckNorrisSignalService)
   {
      this._service.effects.bindFooterFact(this.fact);
   }

   ngOnInit(): void
   {
      this._service.events.fetchFooterFact();
      console.log('fact', this.fact);
   }
}
