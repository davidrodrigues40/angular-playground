import { Frame } from './frame';
import { Player } from './player';

export interface Bowler extends Player
{
   frames: Map<number, Frame>;
   score: number;
}
