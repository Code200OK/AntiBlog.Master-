import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from './actions';

export const authFeatureName = 'auth';

export interface RegistrationState {
    isSpinnerOn: boolean;
}

export const initialState: RegistrationState = {
    isSpinnerOn: false
};

const reducer = createReducer(
    initialState,
    on(AuthActions.submitRegistration, (state) => ({ ...state, isSpinnerOn: true })),
    on(AuthActions.registrationSuccess, (state) => ({ ...state, isSpinnerOn: false })),
    on(AuthActions.registrationFailed, (state) => ({ ...state, isSpinnerOn: false }))
);

export function authReducer(state: RegistrationState, action: Action): RegistrationState {
    return reducer(state, action);
}
