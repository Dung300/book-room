import { HttpClientModule } from '@angular/common/http'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import * as mobileLocalStorage from 'nativescript-localstorage';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    HttpClientModule,
    RegistrationModule,
    LoginModule
    ],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: Storage,
      useValue: mobileLocalStorage
    }
  ]
})
export class AppModule {}
