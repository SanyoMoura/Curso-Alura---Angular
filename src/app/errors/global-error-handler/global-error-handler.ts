import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import * as StackTrace from 'stacktrace-js';
import { environment } from 'src/environments/environment';

import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private _injector: Injector) { }

  handleError(error: any): void {
    const location = this._injector.get(LocationStrategy);
    const userService = this._injector.get(UserService);
    const serverLogService = this._injector.get(ServerLogService);
    const router = this._injector.get(Router);

    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = error.message ? error.message : error.toString();

    if (environment.production) router.navigate(['/error']);

    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

        console.log(message);
        console.log(stackAsString);

        serverLogService
          .log({message, url, userName: userService.userName, stack: stackAsString})
          .subscribe(
            () => console.log('Error logged on server.'),
            err => {
              console.log(err);
              console.log('Fail to send error to sever!');
            }
          );
      });
  }
}
