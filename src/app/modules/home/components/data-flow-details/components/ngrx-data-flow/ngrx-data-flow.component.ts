import { NgrxDataFlowCanvasComponent } from 'src/app/canvas/ngrx-data-flow-canvas/ngrx-data-flow-canvas.component';
import { Title2Component } from 'src/app/components/title2/title2.component';

import { Component } from '@angular/core';

@Component({
   selector: 'app-ngrx-data-flow',
   standalone: true,
   imports: [
      Title2Component,
      NgrxDataFlowCanvasComponent
   ],
   templateUrl: './ngrx-data-flow.component.html',
})
export class NgrxDataFlowComponent
{

}
