import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  // FormGroup
  passwordresetFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { 
      this.passwordresetFormGroup = this.formBuilder.group(
      {
        uid: new FormControl("", Validators.compose([Validators.required])),
        token: new FormControl("", Validators.compose([Validators.required])),

        new_password1: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        new_password2: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
      });
      this.passwordresetFormGroup.patchValue({
        uid: this.route.snapshot.paramMap.get("uid"),
        token: this.route.snapshot.paramMap.get("token"),
      });
  }


  ngOnInit() {
  }

  resetpassword() {
    // create new temp -> take formgroup value
    // patch token 
    this.authService
      .changePassword(this.passwordresetFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal.fire({
            title: "Tukar kata laluan",
            text:
              "Tukar kata laluan anda sudah berjaya. Sila log masuk dengan kata laluan yang baru. Terima kasih.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            title: "Tukar kata laluan",
            text:
              "Tukar kata laluan anda tidak berjaya ditukar. Sila cuba lagi.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      );

  }

}
