import { ISignalService } from 'src/app/interfaces/services/signal-service.interface';

import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SignalEvent, StateEvent } from './state-event';

describe('StateEvent', () =>
{
   let service: StateEvent<string, any>;
   let action: jasmine.SpyObj<Action> = jasmine.createSpyObj('Action', ['type']);
   let store: MockStore<any>;

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         providers: [
            provideMockStore<any>()
         ]
      });
      store = TestBed.inject(MockStore);
      service = new StateEvent<string, any>(action, store);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when emit invoked', () =>
   {
      it('should emit event', () =>
      {
         spyOn(store, 'dispatch');

         service.emit();

         expect(store.dispatch).toHaveBeenCalledWith(action);
      });
   });
});

describe('SignalEvent', () =>
{

   let event: SignalEvent;
   let service: jasmine.SpyObj<ISignalService> = jasmine.createSpyObj('ISignalService', ['dispatch']);

   beforeAll(() =>
   {
      event = new SignalEvent('method', service);
   });

   it('should be created', () =>
   {
      expect(service).toBeTruthy();
   });

   describe('when emit invoked', () =>
   {
      it('should emit event', () =>
      {
         event.emit();

         expect(service.dispatch).toHaveBeenCalledWith('method');
      });
   });
});
