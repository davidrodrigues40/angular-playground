import { WritableSignal } from '@angular/core';

import { MenuItem } from './models/menu-item';

export interface MenuState
{
   items: WritableSignal<ReadonlyArray<MenuItem>>;
}