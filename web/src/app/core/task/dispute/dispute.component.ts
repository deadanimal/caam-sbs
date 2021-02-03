import { Component, OnInit, NgZone, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DisputeService } from 'src/app/shared/services/dispute/dispute.service';
import { DisputeModel } from 'src/app/shared/services/dispute/dispute.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { UsersModel } from 'src/app/shared/services/users/users.model';
import { invoicelist } from 'src/app/variables/finance/invoice';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { FpldatasService } from 'src/app/shared/services/fpldatas/fpldatas.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";



@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.scss']
})
export class DisputeComponent implements OnInit {
  userObj: any;      
  disputeList: DisputeModel[] = [];
  fpls: FpldatasModel[] = [];
  archs: FpldatasModel[] = [];

  editedFpls: FpldatasModel[] = [];
  fpl_ids: any[] = [];
  arch_ids: any[] = [];

  opened_id: string = null;
  selectedUser: string = null;
  users: UsersModel[] = [];
  entries: number = 5;

  fplFormGroup: any;

  rows = invoicelist;
  activeRow: any;

  // modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-xl"
  }

  constructor(
    public formBuilder: FormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private disputeService: DisputeService,
    private modalDialogService: BsModalService,
    private fpldataService: FpldatasService,
  ) {
    this.fplFormGroup = this.formBuilder.group({
      id: new FormControl(""), 
      fpl_date_ts: new FormControl(""), 
      fpl_no : new FormControl(""), 
      aircraft_model: new FormControl(""), 
      dep : new FormControl(""), 
      dest : new FormControl(""), 
      ctg : new FormControl(""), 
      dist : new FormControl(""), 
      route : new FormControl(""), 
    });

  }


  ngOnInit() {
    this.checkRole();
    this.getExplicitUsers();
    this.opened_id = null;
    this.selectedUser = null;
  }

  getExplicitUsers() {
    this.userService.getExplicit().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        console.log(err);
      });
  }

  onActivate(event) {
    this.activeRow = event.row;
  }
  
  openModal(modalRef: TemplateRef<any>, row) {
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
    console.log(modalRef);
  }
        
  openModalHod(modalRef: TemplateRef<any>, row) {
    this.opened_id = row.id;
    this.fpl_ids = row.fpl_ids;
    this.arch_ids = row.arch_ids;
    this.getDisputedFpls();
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  openModalOps(modalRef: TemplateRef<any>, row) {
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
    console.log(modalRef);
  }

  closeModal() {
    this.modal.hide()
  }

  rejectDispute() {
    this.disputeService.reject({'id':this.opened_id}).subscribe(
      (res) => {
        this.modal.hide()
        this.checkRole();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openSubModal(modalRef: TemplateRef<any>, row) {
    this.modal.hide();
    this.fplFormGroup.patchValue({...row});
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  archiveFpl(row) {
    this.disputeService.archieve({'fpl_id':row.id, 'dispute_id':this.opened_id}).subscribe(
      (res) => {
        this.fpl_ids = res.fpl_ids;
        this.arch_ids = res.arch_ids;
        this.getDisputedFpls()
      },
      (err) => {
      });
  }

  getDisputeHOD() {
    this.disputeService.get().subscribe(
      (res) => {
        this.disputeList = res;
      },
      (err) => {
        console.log(err);
      });
  }

  getDisputeOPS(email) {
    let body = {
      "type": "ops",
      "email": email
    }
    this.disputeService.getFilter(body).subscribe(
      (res) => {
        this.disputeList = res;
      },
      (err) => {
        console.log(err); 
      });
  }

  getDisputedFpls() {
      this.disputeService.getfilteredHOD({'fpl_ids': this.fpl_ids}).subscribe(
      (res) => {
        this.fpls = res;
        console.log(this.fpls);
      },
      (err) => {
        console.log(err);
      });

      this.disputeService.getfilteredHOD_2({'arch_ids': this.arch_ids}).subscribe(
      (res) => {
        this.archs = res;
        console.log(this.archs);
      },
      (err) => {
        console.log(err);
      });

  }

  assignUser() {
    this.modal.hide()
    let body = {
      "id": this.opened_id,
      "user": this.selectedUser
    }
    this.disputeService.assignUser(body).subscribe(
    (res) => {
      console.log(res);
      this.checkRole();
    },      
    (err) => {
      console.log(err);
    });
  }

  checkRole() {
    this.userObj = this.authService.decodedToken();
    let utype = this.userObj.user_type;
    if (utype == 'HOD') {
      this.getDisputeHOD();
    }
    else if (utype == 'OPS' || utype == 'APT') {
      this.getDisputeOPS(this.userObj.email);
    }
  }

  fplEdit() {
    let id = this.fplFormGroup.value['id']
    this.fpldataService.update(id, this.fplFormGroup.value).subscribe(
      (res) => {
        console.log(res);
        this.getDisputedFpls();
        this.modal.hide();
      },
      (err) => {
        console.log(err);
        this.getDisputedFpls();
        this.modal.hide();
      }
    );
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  creditDebit() {
    this.disputeService.createNote({"id": this.opened_id}).subscribe(
    (res) => {
      this.modal.hide()
    },
    (err) => {
      this.modal.hide()
    });
  }

}


