import { HttpClient } from '@angular/common/http';

export abstract class HttpSignalService
{
   protected readonly details: {
      [k: string]: any,
      httpClient?: HttpClient | undefined,
      base_url?: string,
   } = {
         httpClient: undefined,
         base_url: ''
      };

   dispatch(name: string, args?: { [key: string]: any; }): void
   {
      if (this.details[name] !== undefined && typeof this.details[name] === 'function')
      {
         const func: any = this.details[name];
         if (func instanceof Function)
         {
            if (args)
               (this.details[name] as Function)(args);
            else
               (this.details[name] as Function)();
         }
      }
   }
}