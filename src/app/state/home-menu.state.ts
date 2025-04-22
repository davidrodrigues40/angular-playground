import { signal, WritableSignal } from '@angular/core';
import { MenuItem } from '../interfaces/models/menu/menu-item';

export class HomeMenuState {
   static readonly items: WritableSignal<Array<MenuItem>> = signal<Array<MenuItem>>([] as Array<MenuItem>);
}