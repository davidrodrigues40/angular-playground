import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly _store: Store) {
  }

  login(username: string, password: string): void {
  }
}
