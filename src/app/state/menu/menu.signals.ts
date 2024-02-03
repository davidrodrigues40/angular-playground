import { signal } from '@angular/core';

import { MenuState } from './menu.state';
import { MenuItem } from './models/menu-item';

export function menuSignals()
{
   return _menuSignals;
}

let _items: MenuItem[] = [];

const _menuSignals: MenuState =
{
   items: signal<ReadonlyArray<MenuItem>>(_items)
}
