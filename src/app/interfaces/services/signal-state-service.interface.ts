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
   effects: {
      _service: IHttpSignalService
   };
   events: {
      _service: IHttpSignalService;
   };
   observables: {};
}