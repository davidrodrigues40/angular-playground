import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
   declarations: [
      MenuComponent,
      MenuItemComponent
   ],
   imports: [
      CommonModule,
      RouterModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule
   ],
   exports: [
      MenuComponent
   ]
})
export class MenuModule { }
