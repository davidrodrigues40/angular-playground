import { signal, WritableSignal } from '@angular/core';

import { MenuItem } from '../menu/models/menu-item';

export interface ISignals<T>
{
   signal: WritableSignal<T>;
}

export function homeMenuSignals()
{
   return _homeMenuSignals;
}

let _homeMenuItems: MenuItem[] = [];

const _homeMenuSignals: ISignals<ReadonlyArray<MenuItem>> =
{
   signal: signal<MenuItem[]>(_homeMenuItems)
}
