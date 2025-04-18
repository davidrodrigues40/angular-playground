import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';

import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';

import { BaseFooter } from '../base-footer.component';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/state/chuck-norris.state';

@Component({
   selector: 'app-chuck-norris-footer',
   templateUrl: './chuck-norris-footer.component.html',
   imports: [
      CommonModule,
      BaseFooter],
   standalone: true
})
export class ChuckNorrisFooterComponent implements OnInit {
   fact: WritableSignal<ChuckNorrisFact | null> = ChuckNorrisFactState.footerFact;
   constructor(private readonly _service: ChuckNorrisFactsService) { }

   ngOnInit(): void {
      this._service.getFooterFact();
   }
}
