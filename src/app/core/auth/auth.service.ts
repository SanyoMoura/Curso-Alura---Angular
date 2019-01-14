import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.api_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _userService: UserService) { }

  authenticate(userName: string, password: string) {
    return this._http
      .post(`${API_URL}/user/login`, { userName, password }, { observe: 'response'})
      .pipe(tap(response  => {
        const authToken = response.headers.get('x-access-token');
        this._userService.token = authToken;
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }
}
