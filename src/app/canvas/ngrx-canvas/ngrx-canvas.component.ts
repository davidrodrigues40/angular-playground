import { CanvasDirective } from 'src/app/directives/canvas/canvas.directive';
import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ngrx-canvas',
   templateUrl: './ngrx-canvas.component.html',
   standalone: true,
   imports: [CanvasDirective],
   providers: [CanvasService]
})
export class NgrxCanvasComponent implements OnInit
{
   private readonly _tier1Color: string = '#3399ff';
   private readonly _tier2Color: string = '#009900';
   private readonly _tier3Color: string = '#007399';
   public drawing: CanvasDrawing = {} as CanvasDrawing;

   constructor(private readonly _canvasService: CanvasService) { }

   ngOnInit(): void
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

      this.drawing = {
         startX: 10,
         startY: 20,
         width: 0,
         height: 0,
         lineHeight: 30,
         font: '16px Arial',
         node: ngrxNode,
         lineWidth: 10,
         backgroundColor: 'white'
      };
   }
}
