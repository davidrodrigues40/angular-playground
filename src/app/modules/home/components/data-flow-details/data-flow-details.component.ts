import { Component } from '@angular/core';

import { SignalDataFlowComponent } from './components/signal-data-flow/signal-data-flow.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
   selector: 'app-data-flow-details',
   templateUrl: './data-flow-details.component.html',
   standalone: true,
   imports: [
      SignalDataFlowComponent,
      RouterModule,
      MatIconModule,
      BackButtonComponent]
})
export class DataFlowDetailsComponent {

}
