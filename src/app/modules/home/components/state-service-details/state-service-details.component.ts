import { Component } from '@angular/core';

import { StateCanvasComponent } from '../../../../canvas/state-canvas/state-canvas.component';

@Component({
   selector: 'app-state-service-details',
   standalone: true,
   imports: [
      StateCanvasComponent
   ],
   templateUrl: './state-service-details.component.html'
})
export class StateServiceDetailsComponent
{

}
