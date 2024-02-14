import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

export abstract class HttpSignalService
{
   abstract readonly details: HttpSignalServiceDetails;

   dispatch(name: string, args?: { [key: string]: any; }): Observable<any>
   {
      if (this.details[name] !== undefined && typeof this.details[name] === 'function')
      {
         const func: any = this.details[name];
         if (func instanceof Function)
         {
            if (args)
               return (this.details[name] as Function)(args);
            else
               return (this.details[name] as Function)();
         }
      }

      return EMPTY;
   }
}

export class HttpSignalServiceDetails
{
   [k: string]: any;
   httpClient?: HttpClient;
   base_url?: string;
}