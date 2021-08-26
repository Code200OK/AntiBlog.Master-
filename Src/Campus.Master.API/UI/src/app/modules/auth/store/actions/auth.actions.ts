import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { RegisterUser } from '../../shared/models';


export const submitRegistration = createAction('[Auth] Submit Registration Form', props<RegisterUser>());
export const registrationSuccess = createAction('[Auth/API] Registration Success', props<{ token: string }>());
export const registrationFailed = createAction('[Auth/API] Registration Failed', props<{ httpError: HttpErrorResponse }>());

export const signInUser = createAction('[Auth] Sign In User');
export const signInUserSuccess = createAction('[Auth/API] Sign In User Success');
export const signInUserFailed = createAction('[Auth/API] Sign In User Failed');
