import { Component } from '@angular/core';
import { CanvasDirective } from 'src/app/directives/canvas/canvas.directive';
import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';
import { CanvasService } from 'src/app/services/canvas/canvas.service';

@Component({
   selector: 'app-signals-data-flow-canvas',
   templateUrl: './signals-data-flow-canvas.component.html',
   standalone: true,
   imports: [CanvasDirective],
   providers: [CanvasService],
})
export class SignalsDataFlowCanvasComponent
{
   public drawing: CanvasDrawing = {} as CanvasDrawing;
   private readonly _tier1Color: string = '#3399ff';
   private readonly _tier2Color: string = '#009900';
   private readonly _tier3Color: string = '#007399';
   private readonly _tier4Color: string = 'brown';
   private readonly _tier5Color: string = 'purple';

   constructor(private readonly _canvasService: CanvasService) { }

   ngOnInit(): void
   {
      this.drawCanvas();
   }

   private drawCanvas(): void
   {
      const signals: CanvasNode = this._canvasService.addNode(1, this._tier5Color, 'signals', []);

      const dataService: CanvasNode = this._canvasService.addNode(1, this._tier4Color, 'data service', [signals]);

      const effects: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'effect', [signals]);
      const events: CanvasNode = this._canvasService.addNode(2, this._tier3Color, 'events', [dataService]);
      const observables: CanvasNode = this._canvasService.addNode(3, this._tier3Color, 'observables', [signals]);

      const stateService: CanvasNode = this._canvasService.addNode(1, this._tier2Color, 'state service', [effects, events, observables]);

      const componentNode: CanvasNode = this._canvasService.addNode(1, this._tier1Color, 'component', [stateService]);

      this.drawing = {
         startX: 10,
         startY: 20,
         width: 300,
         height: 0,
         lineHeight: 30,
         font: '16px Arial',
         node: componentNode,
         lineWidth: 10,
         backgroundColor: 'white'
      };
   }
}
