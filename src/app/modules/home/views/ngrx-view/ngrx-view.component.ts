import { Component } from '@angular/core';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

@Component({
    selector: 'app-ngrx-view',
    templateUrl: './ngrx-view.component.html',
    styleUrls: ['./ngrx-view.component.scss'],
    providers: [CanvasService]
})
export class NgrxViewComponent
{

}
