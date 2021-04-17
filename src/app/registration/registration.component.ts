import { error } from "@angular/compiler/src/util";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RouterExtensions } from "@nativescript/angular";
import { Dialogs } from "@nativescript/core";
import { Application, ListPicker } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import{RegistrationService} from "../registration/registration.service"

@Component({
    selector: "registration",
    templateUrl: "./registration.component.html"

})
export class RegistrationComponent implements  OnInit {
    public registrationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private registrationService: RegistrationService,
        // private router: Router,
        private routerExtension: RouterExtensions,


        ) {
    }

    ngOnInit(): void {
        this.registrationForm = this.fb.group({
            "name": ["", [Validators.required]],
            "username": ["", [Validators.required]],
            "email": ["", [Validators.required]],
            "password": ["", [Validators.required]],
            "phone": ["", [Validators.required]],
            "address": ["", [Validators.required]],


        });

    }
    createAccount(){
        this.registrationService.createAccount(this.registrationForm.value).subscribe((result)=>
        console.log(result," create account success"))
        this.routerExtension.navigate(['/home'])

      }
    //   onDrawerButtonTap(): void {
    //     const sideDrawer = <RadSideDrawer>Application.getRootView();
    //     sideDrawer.showDrawer();
    // }
}
