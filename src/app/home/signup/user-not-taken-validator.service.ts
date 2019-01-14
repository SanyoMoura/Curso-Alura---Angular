import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignupService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private _signupService: SignupService) { }

  checkUserNameTaken() {
    return (control: AbstractControl) =>
      control
        .valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(userName => this._signupService.checkUserNameTaken(userName)))
        .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
        .pipe(first());
  }
}
