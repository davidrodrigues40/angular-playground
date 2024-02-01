import { CanvasElement, CanvasNode } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'app-data-flow-canvas',
    templateUrl: './data-flow-canvas.component.html',
    styleUrls: ['./data-flow-canvas.component.scss'],
    standalone: true,
    providers: [CanvasService]
})
export class DataFlowCanvasComponent implements AfterViewInit
{
    private readonly _tier1Color: string = '#3399ff';
    private readonly _tier2Color: string = '#009900';
    private readonly _tier3Color: string = '#007399';

    constructor(private readonly _canvasService: CanvasService)
    {
    }

    ngAfterViewInit(): void
    {
        this.drawCanvas();
    }

    private drawCanvas(): void
    {
        const actionsNode: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'actions', []);

        const selectorsNode: CanvasNode = this._canvasService.addNode(2, this._tier3Color, 'selectors', []);

        const serviceNode: CanvasNode = this._canvasService.addNode(1, this._tier2Color, 'state service', [actionsNode, selectorsNode]);

        const otherServiceNode: CanvasNode = this._canvasService.addNode(2, this._tier2Color, 'other service', []);

        const componentNode: CanvasNode = this._canvasService.addNode(1, this._tier1Color, 'component', [serviceNode, otherServiceNode]);

        const canvas: CanvasElement = this._canvasService.createCanvas(10, 20, 0, 0, 30, 10, 'white', 'data-flow-canvas', '16px Arial', [componentNode]);

        this._canvasService.drawCanvas(canvas);
    }

}
