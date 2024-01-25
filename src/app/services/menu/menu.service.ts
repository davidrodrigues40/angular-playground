import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from 'src/app/state/menu/models/menu-item';
import { ApiService } from '../api.service';

@Injectable()
export class MenuService extends ApiService
{
    private readonly _menuItems: MenuItem[] = [
        { value: 'Home', route: '/home' },
        { value: 'Books', route: '/books' },
        { value: 'Bowling', route: '/bowling' }
    ];

    constructor(private readonly _httpClient: HttpClient) { super(); }

    getAll$(): Observable<MenuItem[]>
    {
        return of(this._menuItems);
    }
}
