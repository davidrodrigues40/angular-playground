import { WritableSignal } from '@angular/core';

import { MenuItem } from '../../interfaces/models/menu/menu-item';

export interface MenuState
{
   items: WritableSignal<ReadonlyArray<MenuItem>>;
}