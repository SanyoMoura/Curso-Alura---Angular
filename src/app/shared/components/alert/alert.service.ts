import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';

import { Alert, AlertType } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterNavigate = false;

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        if (this.keepAfterNavigate)
          this.keepAfterNavigate = false;
        else
          this.clear();
    });
  }

  success(message, keepAfterNavigate: boolean = false) {
    this.alert(AlertType.SUCCESS, message, keepAfterNavigate);
  }

  warning(message, keepAfterNavigate: boolean = false) {
    this.alert(AlertType.WARNING, message, keepAfterNavigate);
  }

  danger(message, keepAfterNavigate: boolean = false) {
    this.alert(AlertType.DANGER, message, keepAfterNavigate);
  }

  info(message, keepAfterNavigate: boolean = false) {
    this.alert(AlertType.INFO, message, keepAfterNavigate);
  }

  protected alert(alertType: AlertType, message: string, keepAfterNavigate: boolean) {
    this.keepAfterNavigate = keepAfterNavigate;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clear() {
    this.alertSubject.next(null);
  }
}
