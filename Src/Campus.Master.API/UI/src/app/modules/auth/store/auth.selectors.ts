import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, RegistrationState } from './auth.reducer';

export const selectRegistrationState = createFeatureSelector<RegistrationState>(authFeatureName);

export const selectSpinnerState = createSelector(
    selectRegistrationState,
    (state) => state.isSpinnerOn
);
