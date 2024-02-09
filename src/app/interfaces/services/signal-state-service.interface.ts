import { ISignalService } from './signal-service.interface';

export interface ISignalStateService
{
   effects: {
      [key: string]: Function | ISignalService;
   };
   events: {
      _service: ISignalService;
   };
   observables: {};
}