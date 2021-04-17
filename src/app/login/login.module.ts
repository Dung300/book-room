import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule, NativeScriptRouterModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { LoginRoutingModule } from "./login-routing.module";
import {LoginComponent} from'./login.component';
// import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";


@NgModule({
    imports: [
        LoginRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        CommonModule


    ],
    declarations: [
        LoginComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
