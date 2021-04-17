import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule, NativeScriptRouterModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./registration.component";

// import{NativeScriptDateTimePickerModule} from ''

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        CommonModule,
        HttpClientModule,
        FormsModule,



        RegistrationRoutingModule

    ],
    declarations: [
        RegistrationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RegistrationModule { }
