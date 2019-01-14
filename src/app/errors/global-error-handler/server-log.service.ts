import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ServerLog } from './server-log';

const API_LOG = environment.serverLog_URL;

@Injectable({providedIn: 'root'})
export class ServerLogService {

  constructor(private _http: HttpClient) { }

  log(serverLog: ServerLog) {
    return this._http.post(`${API_LOG}/infra/log`, serverLog);
  }
}
