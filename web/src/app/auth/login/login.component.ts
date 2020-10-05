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

  // FormGroup
  loginFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
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
        // console.log("res", res);
        let user_obj = this.authService.decodedToken();
        this.loginAs(user_obj.user_type);
      },
      (err) => {
        // console.error("err", err);
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

  loginAs(role: string) {
    // data from database
    /*
    ('HOD', 'Head of Department'),
    ('FIN', 'Finance'),
    ('OPS', 'Operation'),
    ('APT', 'Airport'),
    ('ALN', 'Airline'),
    ('SAF', 'SAF'),
    ('NAV', 'Not Available')
    */
    switch (role) {
      case "APT":
        this.router.navigate(["/airport/dashboard"]);
        break;
      case "OPS":
        this.router.navigate(["/operation/dashboard"]);
        break;
      case "HOD":
        this.router.navigate(["/hod/dashboard"]);
    }
  }

  loginOld(role) {
    if (role == "staff") {
      alert("There are error on this role. Sorry for the inconvenience");
    } else this.router.navigate(["/" + role + "/dashboard"]);

    /* if (this.email && this.password) {
      // Admin
      if (this.email == "admin" && this.password == "admin") {
        this.router.navigate(['/headquarter/dashboard']);
      }
      // Staff
      else if (this.email == "staff" && this.password == "staff") {
        this.router.navigate(['/staff/dashboard']);
      }
      // Customer
      else if (this.email == "customer" && this.password == "customer") {
        this.router.navigate(['/customer/dashboard']);
      }
      else alert("Wrong email or password. Please try again");
    } else {
      alert('Please input email and password.');
    } */
  }
}
