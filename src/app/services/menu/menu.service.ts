import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/state/menu/models/menu-item';
import { ApiService } from '../api.service';

@Injectable()
export class MenuService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) { super(); }

  getAll$(): Observable<MenuItem[]> {
    return this._httpClient.get<MenuItem[]>(`${this.base_url}/api/menus`);
  }
}
