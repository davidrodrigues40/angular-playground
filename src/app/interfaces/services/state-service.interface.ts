import { Store } from '@ngrx/store';

export interface IStateService
{
   events: {
      _store: Store<any>,
   };
   observables: {
      _store: Store<any>,
   };
}