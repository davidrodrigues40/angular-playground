import { CanvasElement, CanvasNode } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

import { AfterViewInit, Component } from '@angular/core';

@Component({
   selector: 'app-ngrx-canvas',
   templateUrl: './ngrx-canvas.component.html',
   styleUrls: ['./ngrx-canvas.component.scss'],
   standalone: true
})
export class NgrxCanvasComponent implements AfterViewInit
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
      const stateNode: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'state', []);

      const reducersNode: CanvasNode = this._canvasService.addNode(2, this._tier2Color, 'reducers', [stateNode]);

      const effectsNode: CanvasNode = this._canvasService.addNode(1, this._tier2Color, 'effects', [reducersNode]);

      const actionsNode: CanvasNode = this._canvasService.addNode(1, this._tier1Color, 'actions', [effectsNode, reducersNode]);

      const selectorsNode: CanvasNode = this._canvasService.addNode(2, this._tier1Color, 'selectors', [stateNode]);

      const ngrxNode: CanvasNode = this._canvasService.addNode(1, this._tier1Color, 'ngrx', [actionsNode, selectorsNode]);

      const canvas: CanvasElement = this._canvasService.createCanvas(10, 20, 0, 0, 30, 10, 'white', 'ngrx-canvas', '16px Arial', ngrxNode);

      this._canvasService.drawCanvas(canvas);
   }
}
