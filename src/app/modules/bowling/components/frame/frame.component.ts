import { Component, Input } from '@angular/core';
import { FrameService } from '../../services/frame.service';
import { Frame } from '../../models/frame';

@Component({
   selector: 'app-frame',
   templateUrl: './frame.component.html',
   styleUrls: ['./frame.component.scss'],
   standalone: true,
})
export class FrameComponent {
   @Input() frame: Frame = {
      rolls: new Map<number, number>(),
      score: 0
   };
   @Input() score: number = 0;

   constructor(private readonly _frameService: FrameService) {
   }

   rolls(frame: Frame) {
      let values: number[] = [];

      if (frame.rolls instanceof Map)
         values = Array.from(frame.rolls.values());
      else
         values = Object.values(frame.rolls);

      return this._frameService.getFrameValues(values);
   }
}
