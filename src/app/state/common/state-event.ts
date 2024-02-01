import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export class StateEvent<TEvent extends string, TStore extends Store> {

    constructor(private readonly _action: TypedAction<TEvent>, private readonly _store: TStore)
    {
    }

    emit()
    {
        this._store.dispatch(this._action);
    }
}
