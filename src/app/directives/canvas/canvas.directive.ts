import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';

import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
   selector: '[appCanvas]',
   standalone: true
})
export class CanvasDirective implements AfterViewInit
{
   @Input() drawing!: CanvasDrawing;
   private _htmlCanvas!: HTMLCanvasElement;
   private readonly _xOffset: number = 5;
   private readonly _yOffset: number = 5;

   constructor(private readonly _: ElementRef)
   {
      this._htmlCanvas = _.nativeElement as HTMLCanvasElement;

      if (this._htmlCanvas.nodeName !== 'CANVAS')
         throw new Error('Canvas element not found');
   }

   ngAfterViewInit(): void
   {
      if (!this.drawing)
         throw new Error('Drawing not found');

      this.drawCanvas();
   }

   drawCanvas(): void
   {

      const node: CanvasNode = this.drawing.node;
      const context = this._htmlCanvas.getContext('2d') as CanvasRenderingContext2D;

      console.log("Drawing: ", this.drawing);
      this._htmlCanvas.height = Math.max(this.calculateHeight([node]) + this.drawing.startX, this.drawing.height);
      this._htmlCanvas.width = this.drawing.width > 0 ? this.drawing.width : this.calculateWidth([node], true) + this.drawing.startX;
      this._htmlCanvas.style.backgroundColor = 'white';

      context.font = this.drawing.font;

      this.drawNode(this.drawing.node, this.drawing.startX, this.drawing.startY);
   }

   private calculateHeight(nodes: CanvasNode[]): number
   {
      let height: number = 0;

      nodes.forEach((node: CanvasNode) =>
      {
         height += this.drawing.lineHeight;

         if (node.nodes.length > 1 || (node.nodes.length === 1 && node.nodes[0].nodes.length > 0))
            height += this._yOffset;

         height += this.calculateHeight(node.nodes);
      });

      return height;
   }

   private calculateWidth(nodes: CanvasNode[], isPrimary: boolean = false): number
   {
      let width: number = 0;

      nodes.forEach((node: CanvasNode) =>
      {
         width += (this.getPxFromText(node.text) / 2) + this.drawing.lineWidth;
         width += this.calculateWidth(node.nodes);
      });

      return width;
   }

   private drawNode(node: CanvasNode, x: number, y: number): void
   {
      const componentPx: number = this.getPxFromText(node.text);
      let subnodeY: number = y + this.drawing.lineHeight;
      let subnodeX: number = x + this._xOffset;

      this.drawText(node.text, x, y, node.color);
      subnodeX += componentPx / 2;

      if (node.nodes.length > 0)
      {
         let nodeCount = 1;

         if (node.nodes.length > 1)
         {
            nodeCount = this.getSubNodeCount(node) - this.getSubNodeCount(node.nodes[node.nodes.length - 1]);
         }

         this.drawVerticalLine(subnodeX, y + this._yOffset, node.color, nodeCount);
      }


      node.nodes.forEach((subNode: CanvasNode) =>
      {
         this.drawHorizontalLine(subnodeX, subnodeY + this._yOffset, node.color);

         this.drawNode(subNode, subnodeX + this.drawing.lineWidth + this._xOffset, subnodeY + this._yOffset * 2);

         subnodeY += (this.getSubNodeCount(subNode) + 1) * this.drawing.lineHeight;
      });
   }

   private getSubNodeCount(node: CanvasNode): number
   {
      let count: number = 0;
      node.nodes.forEach((subNode: CanvasNode) => count += 1 + this.getSubNodeCount(subNode));

      return count;
   }

   private drawText(text: string, x: number, y: number, color: string): void
   {
      const context = this._htmlCanvas.getContext('2d') as CanvasRenderingContext2D;

      context.fillStyle = color;
      context.fillText(text, x, y);
   }

   private drawVerticalLine(x: number, startY: number, color: string, subnodecount: number): number
   {
      const context = this._htmlCanvas.getContext('2d') as CanvasRenderingContext2D;
      let lineToY: number = startY + (this.drawing.lineHeight * subnodecount);

      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(x, startY);
      context.lineTo(x, lineToY);
      context.stroke();

      return lineToY;
   }

   private drawHorizontalLine(x: number, y: number, color: string): void
   {
      const context = this._htmlCanvas.getContext('2d') as CanvasRenderingContext2D;
      let lineToX: number = x + this.drawing.lineWidth;

      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(x, y);
      context.lineTo(lineToX, y);
      context.stroke();
   }

   private getPxFromText(text: string): number
   {
      const context = this._htmlCanvas?.getContext('2d') as CanvasRenderingContext2D;

      return context.measureText(text).width;
   }

}
