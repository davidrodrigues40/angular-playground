import { Frame } from 'src/app/interfaces/models/bowling/frame';

import { Component, Input } from '@angular/core';

import { FrameService } from '../../services/frame.service';

@Component({
   selector: 'app-frame',
   templateUrl: './frame.component.html',
   styleUrls: ['./frame.component.scss']
})
export class FrameComponent
{
   @Input() frame: Frame = {
      roles: new Map<number, number>(),
      score: 0
   };
   @Input() score: number = 0;

   constructor(private readonly _frameService: FrameService) { }

   roles(frame: Frame)
   {
      const values: number[] = Object.values(frame.roles);
      return this._frameService.getFrameValues(values);
   }
}
