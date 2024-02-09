import { signal } from '@angular/core';

import { MenuItem } from '../../interfaces/models/menu/menu-item';
import { MenuState } from './menu.state';

export function menuSignals()
{
   return _menuSignals;
}

let _items: MenuItem[] = [];

const _menuSignals: MenuState =
{
   items: signal<ReadonlyArray<MenuItem>>(_items)
}
