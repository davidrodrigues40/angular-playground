import { Component } from '@angular/core';

import { Title2Component } from '../../../../components/title2/title2.component';
import { NgrxDataFlowComponent } from './components/ngrx-data-flow/ngrx-data-flow.component';
import { SignalDataFlowComponent } from './components/signal-data-flow/signal-data-flow.component';

@Component({
   selector: 'app-data-flow-details',
   templateUrl: './data-flow-details.component.html',
   standalone: true,
   imports: [
      NgrxDataFlowComponent,
      SignalDataFlowComponent,
      Title2Component]
})
export class DataFlowDetailsComponent
{

}
