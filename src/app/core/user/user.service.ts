import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userName: string;
  private userSubject = new BehaviorSubject<User>(null);

  constructor(private _tokenService: TokenService) {
    if (this._tokenService.hasToken()) this.decodeAndNotify();
  }

  private decodeAndNotify() {
    const user = jwt_decode(this.token) as User;
    this._userName = user.name;
    this.userSubject.next(user);
  }

  get token() {
    return this._tokenService.token;
  }

  set token(token: string) {
    this._tokenService.token = token;
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  logout() {
    this._tokenService.removeToken(this.token);
    this.userSubject.next(null);
  }

  isLogged() {
    return this._tokenService.hasToken();
  }

  get userName() {
    return this._userName;
  }
}
