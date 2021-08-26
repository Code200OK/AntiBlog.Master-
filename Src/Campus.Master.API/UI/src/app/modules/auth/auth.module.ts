import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { RegistrationService } from './shared/services/registration.service';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { authFeatureName, authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [SingInComponent, RegistrationComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [RegistrationService]
})
export class AuthModule {
}
