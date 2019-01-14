import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/user.service';
import { ObservableInput } from 'rxjs';
import { User } from '../user/user';

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user$: ObservableInput<User>;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user$ = this._userService.getUser();
  }

}
