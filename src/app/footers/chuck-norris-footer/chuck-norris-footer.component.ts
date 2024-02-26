import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';

import { chuckNorrisSignals } from 'src/app/state/chuck-norris/chuck-norris.signals';
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
   fact: WritableSignal<ChuckNorrisFact | null> = chuckNorrisSignals().footerFact;
   constructor(private readonly _service: ChuckNorrisSignalService) { }

   ngOnInit(): void
   {
      this._service.fetchFooterFact();
   }
}
