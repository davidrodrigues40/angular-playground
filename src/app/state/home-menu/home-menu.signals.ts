import { signal } from '@angular/core';

import { MenuItem } from '../../interfaces/models/menu/menu-item';
import { HomeMenuState } from './home-menu.state';

export function homeMenuSignals()
{
   return _homeMenuSignals;
}

let _homeMenuItems: MenuItem[] = [];

const _homeMenuSignals: HomeMenuState =
{
   items: signal<MenuItem[]>(_homeMenuItems)
}