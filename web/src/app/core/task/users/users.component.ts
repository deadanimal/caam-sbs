import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  rowsUsers : UsersModel[] = [];
  tempUsers : UsersModel[] = [];
  activeRow: any;
  closeResult: string;
  processTitle: any;
  tempForm: any;
  userFormGroup: FormGroup;
  getRowClass: any;
  entries: number = 5;


    //id: string,
    //full_name: string,
    //email: string,
    //mobile: string,
    //position: string,
    //department: string,
    //user_type: string,
    //organisation: string,
    //is_active: boolean,
    //date_joined: any,

  constructor(
	private userService: UsersService,
	public authService: AuthService,
    private modalService: NgbModal,
	private formBuilder: FormBuilder,
  ) {
    // init FormGroup, FormControl
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      username: new FormControl("", Validators.compose([
        Validators.required
      ])),
	  email: new FormControl("", Validators.compose([
        Validators.required
      ])), 
      mobile: new FormControl("", Validators.compose([
        Validators.required
      ])),
      position: new FormControl("", Validators.compose([
        Validators.required
      ])), 
      department: new FormControl("", Validators.compose([
        Validators.required
      ])),
      user_type: new FormControl("", Validators.compose([
        Validators.required
      ])),
      company_name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cid_id: new FormControl("", Validators.compose([
        Validators.required
      ])),
      is_active:  new FormControl("", Validators.compose([
        Validators.required
      ])),
    })	
  }

  ngOnInit() {
    this.getUsers();
  }

  submit() {
    // post request to auth/registration route
	this.tempForm = this.userFormGroup.value
	this.tempForm.password1 = "PabloEscobar",
	this.tempForm.password2 = "PabloEscobar",
	this.tempForm.full_name = this.userFormGroup.value['username'],
                  
	this.authService.registerAccount(this.tempForm).subscribe(
	(res) => {
	  if(res) {
		// to do: send email to user (notify registration and give token)
		this.notifyUsers(res);
		this.userService.update(res.user.pk, this.tempForm).subscribe(
		  (res) => {
        swal.fire({
          title: "user registration",
          text:
            "registration succesfull",
          buttonsStyling: false,
          confirmButtonText: "close",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });

			  this.modalService.dismissAll();
		    this.getUsers();
		  },
		  (err) => {
			  
		  });
      }
	},
	(err) => {
	  console.log(err);
      let error = err.error
      let popup = error[Object.keys(error)[0]]
      swal.fire({
        title: "User Registration",
        text:
          popup,
        buttonsStyling: false,
        confirmButtonText: "Close",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });

	});
  }

  getUsers() {
	this.userService.getFiltered().subscribe(
		(res) => {
			this.rowsUsers = res;
			this.tempUsers = this.rowsUsers;
      this.tempUsers = this.rowsUsers.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

			console.log(this.tempUsers);
		},
		(err) => {
			console.log(err);
		});
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tempUsers = this.rowsUsers.filter(function (d) {
      for (var key in d) {
        if (d[key] != "" && d[key] != null) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(val.toString().toLowerCase()) !== -1
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }


  notifyUsers(res) {
	this.userService.notification(res).subscribe(
	  (res) => {
		console.log(res);
	  },
	  (err) => {
		console.log(err);
	  }
    );
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  // Modal Handler (Add New User)
  open(content, type, modalDimension, processTitle) {
    this.processTitle = processTitle;
    this.modalService
      .open(content, {
        windowClass: "modal-mini",
        centered: true,
        size: "lg",
        backdrop: "static",
      })	
      .result.then(
        (result) => {
          this.closeResult = "Closed with: $result";
        },
        (reason) => {
          this.closeResult = "Dismissed $this.getDismissReason(reason)";
          console.log("mama", this.closeResult);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
	  return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }  

  create(content) {
    this.open(content, "modal-mini", "sm", "Add New User");
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  toggleUserStatus(row) {
    let body = {'id': row.id}
    this.userService.toggle(body).subscribe(
      (res) => {
        this.getUsers();
      },
      (err) => {}
    );
  }


  deleteUser(row) {
    this.userService.delete(row.id).subscribe(
      (res) => {
        this.getUsers();
      },
      (err) => {
      }
    );
  }

}
