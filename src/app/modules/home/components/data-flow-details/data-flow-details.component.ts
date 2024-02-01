import { Component } from '@angular/core';
import { DataFlowCanvasComponent } from '../data-flow-canvas/data-flow-canvas.component';
import { Title2Component } from '../../../../components/title2/title2.component';

@Component({
    selector: 'app-data-flow-details',
    templateUrl: './data-flow-details.component.html',
    standalone: true,
    imports: [
        DataFlowCanvasComponent,
        Title2Component]
})
export class DataFlowDetailsComponent
{

}
