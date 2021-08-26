import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../../../core/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, zip } from 'rxjs';
import { AuthenticatedUser } from '../shared/models';
import { LocaleService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.sass'],
})
export class SingInComponent implements OnInit, OnDestroy {
  form: FormGroup;
  spinner: boolean;
  param = { minlength: 8 };

  private signInUser$: Subscription = new Subscription();

  private toastStyles = {
    toastClass: 'ngx-toastr server-error-toastr'
  };

  private responseLocaleMap = {
    'Wrong email or password': 'AUTH.ERROR-TOASTR.WRONG-EMAIL-PASSWORD'
  };

  constructor(private signInService: SignInService,
              private toastr: ToastrService,
              private localeService: LocaleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  ngOnDestroy(): void {
    this.signInUser$.unsubscribe();
  }

  submit() {
    this.spinner = true;
    const user: AuthenticatedUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.signInUser$ = this.signInService.login(user).subscribe(
      (token: string) => {
        localStorage.setItem('token', token);
        this.form.reset();
        this.router.navigate(['/campus']);
      }, (errorResponse: HttpErrorResponse) => {
        const msgLocale$ = errorResponse.status === 400 ?
          zip(this.localeService.get(this.responseLocaleMap[errorResponse.error]),
            this.localeService.get('AUTH.ERROR-TOASTR.HEADER')) :
          zip(this.localeService.get('AUTH.ERROR-TOASTR.SERVER-ERROR'),
            this.localeService.get('AUTH.ERROR-TOASTR.HEADER'));

        msgLocale$.toPromise().then(([message, header]) => this.toastr.error(message, header, this.toastStyles));
        this.spinner = false;
        this.form.reset({ email: user.email});
      }
    );
  }
}
