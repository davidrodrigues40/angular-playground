import { HttpClient } from '@angular/common/http';

import { IHttpSignalService, ISignalService } from './signal-service.interface';

export interface ISignalStateService
{
   events: {
      _service: ISignalService
   };
   observables: {};
}

export interface IHttpSignalStateService
{
   events: {
      _service: IHttpSignalService;
   };
   observables: {};
}