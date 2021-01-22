import { Component, OnInit, NgZone, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DisputeService } from 'src/app/shared/services/dispute/dispute.service';
import { DisputeModel } from 'src/app/shared/services/dispute/dispute.model';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { invoicelist } from 'src/app/variables/finance/invoice';
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
        
  disputeList: DisputeModel[] = [];
  fpls: FpldatasModel[] = [];
  editedFpls: FpldatasModel[] = [];
  fplFormGroup: any;

  opened_id: string = null;
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
    private authService: AuthService,
    private disputeService: DisputeService,
    private modalDialogService: BsModalService,
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
    this.getDispute();
    this.opened_id = null;
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
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
    this.disputeService.getfilteredHOD({'fpl_ids': row.fpl_ids}).subscribe(
      (res) => {
        this.fpls = res;
        console.log(this.fpls);
      },
      (err) => {
        console.log(err);
      }
    )
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
        this.getDispute();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openSubModal(modalRef: TemplateRef<any>, row) {
    // get movement report data for the current disputed 
    this.modal.hide();

    this.fplFormGroup.patchValue({...row});
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  getDispute() {
    this.disputeService.get().subscribe(
      (res) => {
        this.disputeList = res;
      },
      (err) => {
        console.log(err);
      });
  }


}

