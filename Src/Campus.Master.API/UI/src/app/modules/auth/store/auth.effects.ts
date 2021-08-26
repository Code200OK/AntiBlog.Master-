import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, zip } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RegisterUser } from '../shared/models';
import { RegistrationService } from '../shared/services/registration.service';
import { AuthActions } from './actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LocaleService } from '../../../core/services/locale.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
    private toastStyles = {
        toastClass: 'ngx-toastr server-error-toastr'
    };

    private responseLocaleMap = new Map<string, string>([
        ['User already exists', 'AUTH.ERROR-TOASTR.USER-EXISTS'],
        ['Failed to create new user', 'AUTH.ERROR-TOASTR.NEW-USER']
    ]);


    $submitRegistrationForm = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.submitRegistration),
        mergeMap((userForm: RegisterUser) => this.registrationService
            .registerUser(userForm).pipe(
                map((token: string) => {
                    return AuthActions.registrationSuccess({ token });
                }),
                catchError((httpError: HttpErrorResponse) => of(AuthActions.registrationFailed({ httpError })))
            )
        )
    ));

    $registrationSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.registrationSuccess),
        mergeMap((action) => {
            localStorage.setItem('token', action.token); // TODO: Where to store token in ang apps
            this.router.navigate(['/campus']); // TODO: Move to component

            return EMPTY;
        })
    ), { dispatch: false });

    $registrationFailed = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.registrationFailed),
        mergeMap((action) => {
            const msgLocale$ = action.httpError.status === 400 ?
                zip(this.localeService.get(this.responseLocaleMap[action.httpError.error]),
                    this.localeService.get('AUTH.ERROR-TOASTR.HEADER')) :
                zip(this.localeService.get('AUTH.ERROR-TOASTR.SERVER-ERROR'),
                    this.localeService.get('AUTH.ERROR-TOASTR.HEADER'));

            msgLocale$.subscribe(
                ([message, header]) =>
                    this.toastrService.error(message, header, this.toastStyles));

            return EMPTY;
        })
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private router: Router,
        private localeService: LocaleService,
        private registrationService: RegistrationService,
        private toastrService: ToastrService,
    ) { }
}
