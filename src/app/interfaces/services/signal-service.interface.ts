import { HttpClient } from '@angular/common/http';

export interface ISignalService
{
   details: {
      [k: string]: any,
      httpClient?: HttpClient,
      base_url?: string
   }
   dispatch(name: string, args?: { [key: string]: any; }, httpClient?: HttpClient): void;
}