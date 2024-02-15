import { Component } from '@angular/core';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

@Component({
   selector: 'app-ngrx-view',
   templateUrl: './ngrx-view.component.html',
   providers: [CanvasService]
})
export class NgrxViewComponent
{

}
