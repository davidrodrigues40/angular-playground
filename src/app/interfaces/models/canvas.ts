export interface CanvasDrawing
{
   startX: number;
   startY: number;
   height: number;
   width: number;
   lineHeight: number;
   lineLength: number;
   backgroundColor: string;
   font: string;
   node: CanvasNode;
}

export interface CanvasNode
{
   order: number;
   color: string;
   text: string;
   nodes: Array<CanvasNode>;
}