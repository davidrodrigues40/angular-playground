import { Component } from '@angular/core';

import { NgrxDataFlowCanvasComponent } from '../../../../canvas/ngrx-data-flow-canvas/ngrx-data-flow-canvas.component';
import { Title2Component } from '../../../../components/title2/title2.component';
import { NgrxDataFlowComponent } from './components/ngrx-data-flow/ngrx-data-flow.component';

@Component({
   selector: 'app-data-flow-details',
   templateUrl: './data-flow-details.component.html',
   standalone: true,
   imports: [
      NgrxDataFlowComponent,
      Title2Component]
})
export class DataFlowDetailsComponent
{

}
