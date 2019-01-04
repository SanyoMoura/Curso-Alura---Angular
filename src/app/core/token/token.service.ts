import { Injectable } from '@angular/core';

const KEY = 'authToke';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  get token() {
    return window.localStorage.getItem(KEY);
  }

  set token(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  hasToken() {
    return !!this.token;
  }

  removeToken(token: string) {
    window.localStorage.removeItem(KEY);
  }

}
