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
export class SignalsDataFlowCanvasComponent {
   public drawing: CanvasDrawing = {} as CanvasDrawing;
   private readonly _tier1Color: string = '#3399ff';
   private readonly _tier2Color: string = '#009900';
   private readonly _tier3Color: string = '#007399';
   private readonly _tier4Color: string = 'brown';
   private readonly _tier5Color: string = 'purple';

   constructor(private readonly _canvasService: CanvasService) { }

   ngOnInit(): void {
      this.drawCanvas();
   }

   private drawCanvas(): void {
      const listSignal: CanvasNode = this._canvasService.addNode(1, this._tier5Color, 'update contacts signal', []);

      const singleSignal: CanvasNode = this._canvasService.addNode(1, this._tier4Color, 'update contact signal', []);

      const effects: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'get contact', [singleSignal]);
      const effects2: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'get contacts', [listSignal]);

      const contact: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'contact', []);
      const contacts: CanvasNode = this._canvasService.addNode(1, this._tier3Color, 'contacts', []);

      const apiService: CanvasNode = this._canvasService.addNode(1, this._tier2Color, 'api service', [effects, effects2]);
      const signals: CanvasNode = this._canvasService.addNode(1, this._tier2Color, 'signals', [contact, contacts]);

      const componentNode: CanvasNode = this._canvasService.addNode(1, this._tier1Color, 'component', [apiService, signals]);

      this.drawing = {
         startX: 10,
         startY: 20,
         width: 360,
         height: 300,
         lineHeight: 30,
         font: '16px Arial',
         node: componentNode,
         lineWidth: 10,
         backgroundColor: 'white'
      };
   }
}
