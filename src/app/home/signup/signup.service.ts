import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewUser } from './new-user';
import { environment } from 'src/environments/environment';


const API_URL = environment.api_URL;

@Injectable()
export class SignupService {

  constructor(private _http: HttpClient) { }

  checkUserNameTaken(userName: string) {
    return this._http.get(`${API_URL}/user/exists/${userName}`);
  }

  signup(newUser: NewUser) {
    return this._http.post(`${API_URL}/user/signup`, newUser);
  }
}
