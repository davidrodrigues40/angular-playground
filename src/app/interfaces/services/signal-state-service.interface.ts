import { ISignalService } from './signal-service.interface';

export interface ISignalStateService
{
   effects: {};
   events: {
      _service: ISignalService;
   };
   observables: {};
}