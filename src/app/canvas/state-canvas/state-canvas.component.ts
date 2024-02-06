import { CanvasElement, CanvasNode } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
   selector: 'app-state-canvas',
   standalone: true,
   imports: [CommonModule],
   providers: [CanvasService],
   templateUrl: './state-canvas.component.html',
   styleUrls: ['./state-canvas.component.scss'],
})
export class StateCanvasComponent implements AfterViewInit
{
   private readonly _tier1Color: string = '#3399ff';
   private readonly _tier2Color: string = '#009900';
   private readonly _tier3Color: string = '#007399';
   private readonly _tier4Color: string = 'brown';
   private readonly _tier5Color: string = 'purple';
   private readonly _tier6Color: string = 'orange';

   constructor(private readonly _canvasService: CanvasService) { }

   ngAfterViewInit(): void
   {
      this.drawCanvas();
   }

   private drawCanvas(): void
   {
      const stateNode: CanvasNode = this._canvasService.addNode(1, this._tier6Color, 'state', []);

      const reducersNode: CanvasNode = this._canvasService.addNode(1, this._tier5Color, 'reducers', [stateNode]);
      const actionReducersNode: CanvasNode = this._canvasService.addNode(2, this._tier5Color, 'reducers', [stateNode]);
      const effectsNode: CanvasNode = this._canvasService.addNode(2, this._tier4Color, 'effects', [reducersNode]);

      const actionsNode: CanvasNode = this._canvasService.addNode(2, this._tier3Color, 'actions', [effectsNode, actionReducersNode]);
      const selectorsNode: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'selectors', [stateNode]);

      const eventNode: CanvasNode = this._canvasService.addNode(1, this._tier2Color, 'events', [actionsNode]);
      const observablesNode: CanvasNode = this._canvasService.addNode(2, this._tier2Color, 'observables', [selectorsNode]);

      const serviceNode: CanvasNode = this._canvasService.addNode(1, this._tier1Color, 'state service', [eventNode, observablesNode]);

      const canvas: CanvasElement = this._canvasService.createCanvas(10, 20, 0, 0, 30, 10, 'white', 'state-canvas', '16px Arial', serviceNode)

      this._canvasService.drawCanvas(canvas);
   }
}
