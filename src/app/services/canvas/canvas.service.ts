import { CanvasElement, CanvasNode } from 'src/app/interfaces/models/canvas';

import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService
{
   private _element: HTMLCanvasElement | null = null;
   private readonly _xOffset: number = 5;
   private readonly _yOffset: number = 5;
   private _canvas!: CanvasElement;

   drawCanvas(canvas: CanvasElement): void
   {
      const nodes: CanvasNode[] = canvas.nodes;
      this._canvas = canvas;
      this._element = document.getElementById(canvas.elementId) as HTMLCanvasElement;

      if (this._element && this._canvas)
      {
         const context = this._element.getContext('2d');
         this._element.height = Math.max(this.calculateHeight(nodes) + canvas.startX, canvas.height);
         this._element.width = Math.max(this.calculateWidth(nodes, true) + canvas.startY, canvas.width);
         this._element.style.backgroundColor = 'white';

         if (context)
            context.font = this._canvas.font;

         Array.from(canvas.nodes).forEach((node: CanvasNode) =>
         {
            this.drawNode(node, canvas.startX, canvas.startY);
         });
      }
   }

   addNode(order: number, color: string, text: string, nodes: Array<CanvasNode>): CanvasNode
   {
      return {
         color: color,
         order: order,
         text: text,
         nodes: nodes
      };
   }

   createCanvas(startX: number, startY: number, width: number, height: number,
      lineHeight: number, lineLength: number,
      backgroundColor: string, elementId: string, font: string, nodes: Array<CanvasNode>): CanvasElement
   {
      return {
         startX: startX,
         startY: startY,
         width: width,
         height: height,
         lineHeight: lineHeight,
         lineLength: lineLength,
         backgroundColor: backgroundColor,
         elementId: elementId,
         font: font,
         nodes: nodes
      }
   }

   private calculateHeight(nodes: CanvasNode[]): number
   {
      let height: number = 0;

      nodes.forEach((node: CanvasNode) =>
      {
         height += this._canvas.lineHeight;

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
      const componentPx: number = this.getPxFromText(node.text);
      let subnodeY: number = y + this._canvas.lineHeight;
      let subnodeX: number = x + this._xOffset;

      this.drawText(this._element as HTMLCanvasElement, node.text, x, y, node.color);
      subnodeX += componentPx / 2;

      if (node.nodes.length > 0)
      {
         let nodeCount = 1;

         if (node.nodes.length > 1)
         {
            nodeCount = this.getSubNodeCount(node) - this.getSubNodeCount(node.nodes[node.nodes.length - 1]);
         }

         this.drawVerticalLine(this._element as HTMLCanvasElement, subnodeX, y + this._yOffset, node.color, nodeCount);
      }


      node.nodes.forEach((subNode: CanvasNode) =>
      {
         this.drawHorizontalLine(this._element as HTMLCanvasElement, subnodeX, subnodeY + this._yOffset, node.color);

         this.drawNode(subNode, subnodeX + this._canvas.lineLength + this._xOffset, subnodeY + this._yOffset * 2);

         subnodeY += (this.getSubNodeCount(subNode) + 1) * this._canvas.lineHeight;
      });
   }

   private getSubNodeCount(node: CanvasNode): number
   {
      let count: number = 0;
      node.nodes.forEach((subNode: CanvasNode) => count += 1 + this.getSubNodeCount(subNode));

      return count;
   }

   private drawText(canvas: HTMLCanvasElement, text: string, x: number, y: number, color: string): void
   {
      const context = canvas.getContext('2d');

      if (!context)
      {
         return;
      }

      context.fillStyle = color;
      context.fillText(text, x, y);
   }

   private drawVerticalLine(canvas: HTMLCanvasElement, x: number, startY: number, color: string, subnodecount: number = 0): number
   {
      const context = canvas.getContext('2d');
      let lineToY: number = startY + (this._canvas.lineHeight * subnodecount);

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

   private drawHorizontalLine(canvas: HTMLCanvasElement, x: number, y: number, color: string): void
   {
      const context = canvas.getContext('2d');
      let lineToX: number = x + this._canvas.lineLength;

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
      const context = this._element?.getContext('2d');
      if (context)
         context.font = this._canvas.font;

      return context?.measureText(text).width ?? 0;
   }
}