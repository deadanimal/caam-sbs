import { Component, OnInit, NgZone, TemplateRef } from '@angular/core';
import { DisputeService } from 'src/app/shared/services/dispute/dispute.service';
import { DisputeModel } from 'src/app/shared/services/dispute/dispute.model';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { FpldatasService } from 'src/app/shared/services/fpldatas/fpldatas.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.scss']
})
export class DisputeComponent implements OnInit {

  disputeList: DisputeModel[] = [];
  fpls: FpldatasModel[] = [];
  fpl_ids: any[] = [];
  opened_id: string = null;
  activeRow: any;
  temp = [];

  entries: number = 5;

  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-xl"
  }

  constructor(
    private modalDialogService: BsModalService,
    private disputeService: DisputeService,
    private fpldataService: FpldatasService,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.getDispute();
  }
        
  onActivate(event) {
    this.activeRow = event.row;
  }


  getDispute() {
    let user_id = this.authService.decodedToken().user_id;
    this.disputeService.getfilteredCID({'id':user_id}).subscribe(
      (res) => { 
        this.disputeList = res;
        this.temp = this.disputeList.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

        console.log(this.disputeList);
      },
      (err) => {
        console.log(err);
      }
    );

  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.disputeList.filter(function (d) {
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


  getDisputedFpls() {
      this.disputeService.getfilteredHOD({'fpl_ids': this.fpl_ids}).subscribe(
      (res) => {
        this.fpls = res;
        console.log(this.fpls);
      },
      (err) => {
        console.log(err);
      }
    )

  }

  openModal(modalRef: TemplateRef<any>, row) {
    this.opened_id = row.id;
    this.fpl_ids = row.fpl_ids;
    this.getDisputedFpls();
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }
  closeModal() {
    this.modal.hide()
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


}
