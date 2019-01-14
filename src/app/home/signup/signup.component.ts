import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewUser } from './new-user';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken-validator.service';
import { SignupService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
  selector: 'ap-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(private _formBuilder: FormBuilder,
    private _userNotTakenValidatorService: UserNotTakenValidatorService,
    private _signupService: SignupService, private _router: Router,
    private _platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    this.signupForm = this._formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          // Validators.pattern(/^[a-z0-9_\-]+$/)
          lowerCaseValidator
        ],
        this._userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(14)
        ]
      ]
    },
    {
      validator: userNamePassword
    });

    if (this._platformDetectorService.isPlatformBrowser())
      this.emailInput.nativeElement.focus();
 }

  signup() {
    // Esse teste é necessário apenas se deixarmos o botão sempre habilitado
    if (this.signupForm.invalid || this.signupForm.pending)
      return;

    const newUser = this.signupForm.getRawValue() as NewUser;

    this._signupService
      .signup(newUser)
      .subscribe(() => this._router.navigate(['']),
        err => console.log(err));
  }
}
