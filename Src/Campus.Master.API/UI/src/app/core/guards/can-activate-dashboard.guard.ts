import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { Observable, zip } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocaleService } from '../services/locale.service';
import { ProfileInfo } from '../../modules/auth/shared/models';
import { Store } from '@ngrx/store';
import { loadProfileInformationSuccess as loadProfileInfoSuccess } from '../../modules/auth/store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class CanActivateDashboardGuard implements CanActivate {
  constructor(
    private signInService: SignInService,
    private router: Router,
    private toastrService: ToastrService,
    private localeService: LocaleService,
    private store: Store
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.signInService.getProfileInformation().pipe(
      tap((profile: ProfileInfo) =>
        this.store.dispatch(loadProfileInfoSuccess({ profile }))
      ),
      mapTo(true),
      catchError(() => {
        const toastStyles = {
          toastClass: 'ngx-toastr server-error-toastr',
        };

        this.router.navigate(['']);

        return zip(
          this.localeService.get('AUTH.ERROR-TOASTR.NOT-AUTHORIZED'),
          this.localeService.get('AUTH.ERROR-TOASTR.HEADER')
        ).pipe(
          tap(([message, header]) =>
            this.toastrService.error(message, header, toastStyles)
          ),
          mapTo(false)
        );
      })
    );
  }
}
