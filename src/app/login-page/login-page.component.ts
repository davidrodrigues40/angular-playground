import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginService } from '../services/login/login.service';
import { login } from '../state/login/login.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public username: string = '';
  public password: string = '';

  constructor(private readonly _store: Store, private readonly _loginService: LoginService) { }

  onSubmit(): void {
    this._store.dispatch(login({ username: this.username, password: this.password }));
  }
}
