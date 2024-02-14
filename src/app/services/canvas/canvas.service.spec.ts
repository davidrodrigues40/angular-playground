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
});
