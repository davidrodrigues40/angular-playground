import { CanvasNode } from 'src/app/interfaces/models/canvas';

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
}