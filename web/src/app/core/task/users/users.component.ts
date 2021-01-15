import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


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
	private authService: AuthService,
    private modalService: NgbModal,
	private formBuilder: FormBuilder,
  ) {
    // init FormGroup, FormControl
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      username: new FormControl(""),
	  email: new FormControl(""), 
      mobile: new FormControl(""),
      position: new FormControl(""), 
      department: new FormControl(""),
      user_type: new FormControl(""),
      organisation: new FormControl(""),
      is_active:  new FormControl(""),
    })	
  }

  ngOnInit() {
    this.getUsers();
  }

  submit() {
    // post request to auth/registration route
	this.tempForm = this.userFormGroup.value
	this.tempForm.password1 = "abc123def",
	this.tempForm.password2 = "abc123def",
	this.tempForm.full_name = this.userFormGroup.value['username'],
	this.authService.registerAccount(this.tempForm).subscribe(
	(res) => {
	  if(res) {
		// to do: send email to user (notify registration and give token)
		this.notifyUsers(res);
		this.userService.update(res.user.pk, this.tempForm).subscribe(
		  (res) => {
			this.modalService.dismissAll();
		    this.getUsers();
		  },
		  (err) => {
			console.log(err);
		  }
        );
      }
	},
	(err) => {
	  console.log(err);
	});
  }

  getUsers() {
	this.userService.getFiltered().subscribe(
		(res) => {
			this.rowsUsers = res;
			this.tempUsers = this.rowsUsers;
			console.log(this.tempUsers);
		},
		(err) => {
			console.log(err);
		}
	)
	
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

  


}
