import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  email: string;
  password: string;

  loginFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private cookieService: CookieService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {}

  login() {
    this.authService.obtainToken(this.loginFormGroup.value).subscribe(
      (res) => {
        let currentUser = this.authService.decodedToken();
        
        this.userService.currentUser = currentUser;

        this.router.navigate(["/app/dashboard"]);
      },
      (err) => {
        swal.fire({
          title: "Warning",
          text:
            "You have entered an invalid username or password. Please try again.",
          type: "warning",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-warning",
        });
      }
    );
  }

  loginOld(role) {
    if (role == "Airline") {
      this.loginFormGroup.controls.username.setValue('airline@sbs.pipe.my')
      this.loginFormGroup.controls.password.setValue('PabloEscobar')
      
    } else if (role == "Airport") {
      this.loginFormGroup.controls.username.setValue('airport@sbs.pipe.my')
      this.loginFormGroup.controls.password.setValue('PabloEscobar')
      
    } else if (role == "Operation") {
      this.loginFormGroup.controls.username.setValue('operation@sbs.pipe.my')
      this.loginFormGroup.controls.password.setValue('PabloEscobar')
      
    } else if (role == "HOD") {
      this.loginFormGroup.controls.username.setValue('HOD@sbs.pipe.my')
      this.loginFormGroup.controls.password.setValue('PabloEscobar')
      
    } else if (role == "SAF") {
      this.loginFormGroup.controls.username.setValue('SAF@sbs.pipe.my')
      this.loginFormGroup.controls.password.setValue('PabloEscobar')
      
    } else if (role == "Finance") {
      this.loginFormGroup.controls.username.setValue('finance@sbs.pipe.my')
      this.loginFormGroup.controls.password.setValue('PabloEscobar')
      
    } 

    this.login();

  }

}
