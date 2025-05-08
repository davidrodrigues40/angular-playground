import { ChuckNorrisFact } from 'src/app/modules/chuck-norris-fact/models/chuck-norris-fact';

import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';

import { BaseFooter } from '../base-footer.component';
import { ChuckNorrisFactsService } from 'src/app/modules/chuck-norris-fact/services/chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/modules/chuck-norris-fact/chuck-norris.state';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Component({
   selector: 'app-chuck-norris-footer',
   templateUrl: './chuck-norris-footer.component.html',
   imports: [
      CommonModule,
      LoadingComponent,
      BaseFooter],
   providers: [ChuckNorrisFactsService],
   standalone: true
})
export class ChuckNorrisFooterComponent implements OnInit {
   fact: WritableSignal<ChuckNorrisFact | null> = ChuckNorrisFactState.footerFact;
   isLoading: WritableSignal<boolean> = ChuckNorrisFactState.footerLoading;

   constructor(private readonly _service: ChuckNorrisFactsService) { }

   ngOnInit(): void {
      this.isLoading.set(true);
      this._service.getFooterFact();
   }
}
