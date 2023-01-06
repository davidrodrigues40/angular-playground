import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() item: MenuItem;
}
