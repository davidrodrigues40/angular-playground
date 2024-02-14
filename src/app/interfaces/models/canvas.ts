export interface CanvasDrawing
{
   startX: number;
   startY: number;
   height: number;
   width: number;
   lineHeight: number;
   lineWidth: number;
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


export interface CanvasRequest
{
   startX: number, startY: number, width: number, height: number,
   lineHeight: number, lineLength: number, backgroundColor: string, font: string, node: CanvasNode
}