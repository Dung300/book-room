import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { RegistrationComponent } from "../registration/registration.component";
import { LoginComponent } from "./login.component";

const routes: Routes = [
     { path: "", component: LoginComponent },
    //  { path: "registration", component: RegistrationComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LoginRoutingModule { }
