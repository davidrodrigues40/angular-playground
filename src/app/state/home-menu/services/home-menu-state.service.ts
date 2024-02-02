import { ISignalStateService } from 'src/app/interfaces/services/signal-state-service.interface';
import { HomeMenuService } from 'src/app/services/home-menu/home-menu.service';

import { Injectable } from '@angular/core';

import { SignalEvent } from '../../common/state-event';
import { MenuItem } from '../../menu/models/menu-item';
import { homeMenuSignals } from '../home-menu.signals';

@Injectable()
export class HomeMenuStateService implements ISignalStateService
{
   constructor(
      private readonly _service: HomeMenuService,) { }
   events = {
      _service: this._service,
      fetchMenu(): SignalEvent
      {
         return new SignalEvent('getHomeMenuSignals', this._service);
      }
   };
   observables = {
      get menu(): ReadonlyArray<MenuItem>
      {
         return homeMenuSignals().signal();
      }
   };
}
