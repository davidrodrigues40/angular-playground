import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';

import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService
{
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
      lineHeight: number, lineLength: number, backgroundColor: string, font: string, node: CanvasNode): CanvasDrawing
   {
      return {
         startX: startX,
         startY: startY,
         width: width,
         height: height,
         lineHeight: lineHeight,
         lineWidth: lineLength,
         backgroundColor: backgroundColor,
         font: font,
         node: node
      }
   }
}