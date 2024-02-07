import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';

import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
   selector: '[appCanvas]',
   standalone: true
})
export class CanvasDirective implements AfterViewInit
{
   @Input() drawing?: CanvasDrawing;
   private _element: HTMLCanvasElement | null = null;
   private readonly _xOffset: number = 5;
   private readonly _yOffset: number = 5;

   constructor(private readonly _: ElementRef)
   {
      this._element = _.nativeElement as HTMLCanvasElement;
   }

   ngAfterViewInit(): void
   {
      this.drawCanvas();
   }

   drawCanvas(): void
   {
      if (!this.drawing)
         return;
      const node: CanvasNode = this.drawing.node;
      this.drawing = this.drawing;

      if (this._element && this.drawing)
      {
         const context = this._element.getContext('2d');
         this._element.height = Math.max(this.calculateHeight([node]) + this.drawing.startX, this.drawing.height);
         this._element.width = Math.max(this.calculateWidth([node], true) + this.drawing.startY, this.drawing.width);
         this._element.style.backgroundColor = 'white';

         if (context)
            context.font = this.drawing.font;

         this.drawNode(this.drawing.node, this.drawing.startX, this.drawing.startY);
      }
   }

   private calculateHeight(nodes: CanvasNode[]): number
   {
      let height: number = 0;

      nodes.forEach((node: CanvasNode) =>
      {
         if (this.drawing)
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
         width += isPrimary ? this.getPxFromText(node.text) : this.getPxFromText(node.text) / 2;
         width += this.calculateWidth(node.nodes);
      });

      return width;
   }

   private drawNode(node: CanvasNode, x: number, y: number): void
   {
      if (!this.drawing)
         return;

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
         if (!this.drawing)
            return;
         this.drawHorizontalLine(subnodeX, subnodeY + this._yOffset, node.color);

         this.drawNode(subNode, subnodeX + this.drawing.lineLength + this._xOffset, subnodeY + this._yOffset * 2);

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
      if (!this._element) return;
      const context = this._element.getContext('2d');

      if (!context)
      {
         return;
      }

      context.fillStyle = color;
      context.fillText(text, x, y);
   }

   private drawVerticalLine(x: number, startY: number, color: string, subnodecount: number = 0): number
   {
      if (!this._element || !this.drawing)
         return 0;

      const context = this._element.getContext('2d');
      let lineToY: number = startY + (this.drawing.lineHeight * subnodecount);

      if (!context)
      {
         return lineToY;
      }

      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(x, startY);
      context.lineTo(x, lineToY);
      context.stroke();

      return lineToY;
   }

   private drawHorizontalLine(x: number, y: number, color: string): void
   {
      if (!this._element || !this.drawing) return;

      const context = this._element.getContext('2d');
      let lineToX: number = x + this.drawing.lineLength;

      if (!context)
      {
         return;
      }
      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(x, y);
      context.lineTo(lineToX, y);
      context.stroke();
   }

   private getPxFromText(text: string): number
   {
      if (!this.drawing)
         return 0;

      const context = this._element?.getContext('2d');
      if (context)
         context.font = this.drawing.font;

      return context?.measureText(text).width ?? 0;
   }

}
