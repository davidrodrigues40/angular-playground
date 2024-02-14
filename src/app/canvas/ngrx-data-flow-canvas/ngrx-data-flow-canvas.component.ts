import { CanvasDirective } from 'src/app/directives/canvas/canvas.directive';
import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ngrx-data-flow-canvas',
   templateUrl: './ngrx-data-flow-canvas.component.html',
   standalone: true,
   imports: [CanvasDirective],
   providers: [CanvasService]
})
export class NgrxDataFlowCanvasComponent implements OnInit
{
   public drawing: CanvasDrawing = {} as CanvasDrawing;
   private readonly _tier1Color: string = '#3399ff';
   private readonly _tier2Color: string = '#009900';
   private readonly _tier3Color: string = '#007399';

   constructor(private readonly _canvasService: CanvasService)
   {
   }

   ngOnInit(): void
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

      this.drawing = {
         startX: 10,
         startY: 20,
         width: 210,
         height: 0,
         lineHeight: 30,
         font: '16px Arial',
         node: componentNode,
         lineWidth: 10,
         backgroundColor: 'white'
      };
   }

}
