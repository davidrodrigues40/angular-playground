import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MenuService } from '../../services/menu/menu.service';
import { MenuEffects } from '../../state/menu/menu.effects';
import { MenuStateService } from '../../state/menu/service/menu-state.service';
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
    MatIconModule,
    EffectsModule.forFeature([MenuEffects])
  ],
  exports: [
    MenuComponent
  ],
  providers: [MenuService, MenuStateService]
})
export class MenuModule { }
