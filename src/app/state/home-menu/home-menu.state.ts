import { WritableSignal } from '@angular/core';

import { MenuItem } from '../menu/models/menu-item';

export interface HomeMenuState
{
   items: WritableSignal<Array<MenuItem>>;
}