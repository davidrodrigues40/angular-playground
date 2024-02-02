import { ISignalService } from './signal-service.interface';

export interface ISignalStateService
{
   events: {
      _service: ISignalService
   };
   observables: {};
}