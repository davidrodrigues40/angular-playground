import { CanvasNode } from 'src/app/interfaces/models/canvas';

import { TestBed } from '@angular/core/testing';

import { CanvasService } from './canvas.service';

describe('CanvasService', () =>
{
   let service: CanvasService;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [CanvasService]
      });
      service = TestBed.inject(CanvasService);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('addNode', () =>
   {
      it('should return a new node', () =>
      {
         const order = 1;
         const color = 'red';
         const text = 'test';
         const nodes: CanvasNode[] = [];

         const result = service.addNode(order, color, text, nodes);

         expect(result).toEqual({
            color: color,
            order: order,
            text: text,
            nodes: nodes
         });
      });
   });

   describe('createCanvas', () =>
   {
      it('should return a new canvas', () =>
      {
         const startX = 1;
         const startY = 2;
         const width = 3;
         const height = 4;
         const lineHeight = 5;
         const lineLength = 6;
         const backgroundColor = 'red';
         const font = 'Arial';
         const node: CanvasNode = {
            color: 'blue',
            order: 1,
            text: 'test',
            nodes: []
         };

         const result = service.createCanvas(startX, startY, width, height, lineHeight, lineLength, backgroundColor, font, node);

         expect(result).toEqual({
            startX: startX,
            startY: startY,
            width: width,
            height: height,
            lineHeight: lineHeight,
            lineWidth: lineLength,
            backgroundColor: backgroundColor,
            font: font,
            node: node
         });
      });
   });
});
