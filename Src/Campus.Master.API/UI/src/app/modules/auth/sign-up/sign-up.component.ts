import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmPasswordValidator } from '../confirmed.validator';
import { Subscription } from 'rxjs';
import { SignUpCredentials } from '../shared/models';
import { select, Store } from '@ngrx/store';
import { selectSignUpSpinnerState } from '../store';
import { signUp } from '../store/actions/auth.actions';

@Component({
  selector: 'app-registration-page',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  isSpinnerOn$ = this.store.pipe(select(selectSignUpSpinnerState));
  param = { minlength: 8, maxlength: 100 };

  private registerUser$: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        first_name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]),
        last_name: new FormControl(null, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z]*')
        ]),
        nickname: new FormControl(null, [
          Validators.required,
          Validators.maxLength(250)
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          Validators.pattern('(?=.*[0-9])(?=.*[A-Z]).{8,}')
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
        ])
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  ngOnDestroy(): void {
    this.registerUser$.unsubscribe();
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }

    const unregisteredUser: SignUpCredentials = {
      fullName: this.registerForm.value.first_name + ' ' + this.registerForm.value.last_name,
      userName: this.registerForm.value.nickname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    };


    this.store.dispatch(signUp({ signUpModel: unregisteredUser }));
  }
}
