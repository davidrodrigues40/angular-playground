import { signal, WritableSignal } from '@angular/core';
import { MenuItem } from '../interfaces/models/menu/menu-item';

export class MenuState {
   static readonly items: WritableSignal<ReadonlyArray<MenuItem>> = signal<ReadonlyArray<MenuItem>>([] as ReadonlyArray<MenuItem>);
}