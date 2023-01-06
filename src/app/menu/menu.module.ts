import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from '../state/menu/menu.effects';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
    EffectsModule.forFeature([MenuEffects])
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
