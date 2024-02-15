import { ISignalService } from './signal-service.interface';

export interface ISignalStateService
{
   effects: {
      [key: string]: Function | ISignalService;
   };
   methods: {
      _service: ISignalService;
      [key: string]: Function | ISignalService;
   };
   data: {};
}