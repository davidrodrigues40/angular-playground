import { Component } from '@angular/core';
import { SignalsDataFlowCanvasComponent } from 'src/app/canvas/signals-data-flow-canvas/signals-data-flow-canvas.component';
import { Title2Component } from 'src/app/components/title2/title2.component';

@Component({
   selector: 'app-signal-data-flow',
   templateUrl: './signal-data-flow.component.html',
   standalone: true,
   imports: [
      Title2Component,
      SignalsDataFlowCanvasComponent
   ]
})
export class SignalDataFlowComponent
{

}
