import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

  constructor(public router: Router) {}

  ngOnInit() {}

  login(role) {
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
