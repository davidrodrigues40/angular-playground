import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export class Event<TEvent extends string, TStore extends Store> {
  #action: TypedAction<TEvent>;
  #store: Store;

  constructor(action: TypedAction<TEvent>, store: TStore) {
    this.#action = action;
    this.#store = store;
  }

  emit() {
    this.#store.dispatch(this.#action);
  }
}
