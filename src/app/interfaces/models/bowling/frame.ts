export interface Frame
{
   rolls: Map<number, number>;
   score: number;
}

export interface Frames
{
   [key: number]: Frame;
}