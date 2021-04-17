import { HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Dialogs } from "@nativescript/core";
// import { HttpResponse } from "@nativescript/core";

import {AuthService} from '../shared/auth.service'


@Component({
    selector: "login",
    templateUrl: "./login.component.html"

})

export class LoginComponent implements  OnInit {

    constructor(
        private authService: AuthService,
        private routerExtension: RouterExtensions,
        ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {}

    onLoginButtonClicked(username: string, password: string){
        this.authService.login(username, password).subscribe((res: HttpResponse<any>) => {
          console.log(res);
                      // Dialogs.alert('login success');

            this.routerExtension.navigate(['/home' ])

                },(err) =>{
            alert('Wrong username or password');
            console.log("Wrong username or password")
      }


    )}
    logout(){
        this.authService.logout();
    }
}
