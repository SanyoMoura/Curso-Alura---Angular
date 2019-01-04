import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  selector: 'ap-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService,
    private _router: Router, private _platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const userName: string = this.loginForm.get('userName').value.toLowerCase();
    const password: string = this.loginForm.get('password').value;

    this._authService
      .authenticate(userName, password)
      // .subscribe(() => this._router.navigateByUrl(`user/${userName}`),
      .subscribe(() => this._router.navigate(['user', userName]),
        err => {
          console.log(err);
          alert('Invalid user name or password!');
          this.loginForm.reset();
          if (this._platformDetectorService.isPlatformBrowser())
            this.userNameInput.nativeElement.focus();
        });
  }
}
