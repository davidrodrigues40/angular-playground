import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getAll$(): Observable<MenuItem[]> {
    const arr: string[] = ['Books', 'Scoreboard', 'Facts'];
    const items: MenuItem[] = arr.map(a => { return { value: a, route: a.toLowerCase() }; });

    return of(items);
  }
}
