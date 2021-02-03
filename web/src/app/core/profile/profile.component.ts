import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  closeResult: any;
  processTitle: any;
  userFormGroup: FormGroup;
  users = {
    'email':null,
    'mobile':null,
    'position':null,
    'department':null,
    'company_name':null,
    'full_name':null,
    'office_num':null,
    'user_type':null,
  }

  private userId: string = "";
 
  constructor(
  private UsersService: UsersService,
  private AuthService: AuthService,
	private modalService: NgbModal,
	private formBuilder: FormBuilder,
  ) {
    this.userFormGroup = this.formBuilder.group({
	  email: new FormControl(""), 
      mobile: new FormControl(""),
      position: new FormControl(""), 
      department: new FormControl(""),
      company_name: new FormControl(""),
      office_num: new FormControl(""),
    });
  }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
   let user_obj = this.AuthService.decodedToken();
   this.userId = user_obj.user_id;
   this.UsersService.getOne(user_obj.user_id).subscribe(
     (res)=>{
       this.users = res;
     },
     (err)=>{ 
       console.log(err);
     }
   )
  }
  
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
        }
      );	
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing Esc";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by pressing Backdrop";
    } else {
      return "with: $reason"; 
    }
  }

 create(content) {
   this.open(content, "modal-mini", "sm", "Edit User");
 }

 submit() {
   // todo: 
   // get user_obj from decoded token -> user_id
   // or stored user_id as class var 
   // instantaniate formGroup
   // use user_id, and form.value as body
   // make patch call to users endpoint 
   // call getUsers again
   // p/s: implement sweetAlert for confirmation
   this.UsersService.update(this.userId, this.userFormGroup.value).subscribe(
     (res)=> {
       this.modalService.dismissAll();
       this.getUsers();
     },
     (err)=> {
       console.log(err);
     }
   ) 
   
 }
}
