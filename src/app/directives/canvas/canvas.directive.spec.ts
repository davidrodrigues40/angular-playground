import { CanvasDrawing, CanvasNode } from 'src/app/interfaces/models/canvas';

import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CanvasDirective } from './canvas.directive';

describe('CanvasDirective', () =>
{
   let directive: CanvasDirective;
   const element: jasmine.SpyObj<ElementRef> = jasmine.createSpyObj('ElementRef', ['nativeElement'],);

   const drawing: CanvasDrawing = {
      startX: 0,
      startY: 0,
      height: 0,
      width: 0,
      lineHeight: 0,
      lineWidth: 0,
      backgroundColor: '',
      font: '',
      node: {
         order: 0,
         color: '',
         text: '',
         nodes: []
      }
   };

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [
            CanvasDirective
         ]
      });
   });

   describe('on constructor', () =>
   {
      it('should throw exception if element is not canvas', () =>
      {
         element.nativeElement = document.createElement('div');

         expect(() => { return new CanvasDirective(element); }).toThrowError('Canvas element not found');
      });

      it('should create an instance', () =>
      {
         element.nativeElement = document.createElement('canvas');
         directive = new CanvasDirective(element);

         expect(directive).toBeTruthy();
      });
   });

   describe('ngAfterViewInit', () =>
   {
      beforeEach(() =>
      {
         element.nativeElement = document.createElement('canvas');
         directive = new CanvasDirective(element);
      });
      it('should throw exception if missing drawing', () =>
      {
         Object.defineProperty(directive, 'drawing', { value: undefined });

         expect(() => { return directive.ngAfterViewInit(); }).toThrowError('Drawing not found');
      });

      it('should draw canvas', () =>
      {
         directive.drawing = { ...drawing, node: primaryNode() };

         directive.ngAfterViewInit();

         expect().nothing();
      });
   });

   function primaryNode(): CanvasNode
   {
      const subNode2_1: CanvasNode = {
         order: 0,
         color: 'blue',
         text: 'sub-node-2-1',
         nodes: []
      };
      const subNode2: CanvasNode = {
         order: 0,
         color: 'blue',
         text: 'sub-node-2',
         nodes: [subNode2_1]
      };
      const subNode1: CanvasNode = {
         order: 0,
         color: 'blue',
         text: 'sub-node',
         nodes: []
      };
      const node: CanvasNode = {
         order: 0,
         color: '',
         text: 'primary',
         nodes: [subNode1, subNode2]
      };

      return node;
   }
});
