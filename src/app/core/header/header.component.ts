import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  // user: User;  -> Vamos usar o user$ direto no template ((user$ | async) as user)

  constructor(private _userService: UserService, private _router: Router) {
    this.user$ = this._userService.getUser();
    // this.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['']);
  }
}
