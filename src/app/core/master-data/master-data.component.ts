import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PaymentListNewPayment } from 'src/app/shared/services/payment/payment-list-new-payment/payment-list-new-payment.model';
import { PaymentListNewPaymentService } from 'src/app/shared/services/payment/payment-list-new-payment/payment-list-new-payment.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { FpldatasService } from "src/app/shared/services/fpldatas/fpldatas.service";
import { WriteKeyExpr } from '@angular/compiler';

@Component({
  selector: "app-master-data",
  templateUrl: "./master-data.component.html",
  styleUrls: ["./master-data.component.scss"],
})
export class MasterDataComponent implements OnInit {

  // Search Filter
  filterby: String;
  searchText: String;
  searchText2: String;
  fromDate: any;
  toDate: any;

  temp1 = [];
  temp2 = [];

  // Table
  active = 1;
  entries: number = 10;
  activeRow: any;

  // Data
  tempApprovedData = [];
  tempArchiveData = [];
  rowsApproveData = [];
  rowsArchiveData = [];
  datas = [];

  constructor(
    private fpldataService: FpldatasService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.getFplDataNew();
  }

  getFplDataNew() {
    this.spinner.show();
    this.fpldataService.get_masterdata().subscribe(
      (res) => {

        // approved filter
        let index = 0;
        for (let i=0; i < res.length; i++) {
          if (res[i].status=='FPL4') {
            this.rowsApproveData[index] = res[i];
            index++;
          }
        }

        // archived filter
        index = 0;
        for (let i=0; i<res.length; i++) {
          if (res[i].status=='FPL3') {
            this.rowsArchiveData[index] = res[i];
            index++;
          }
        } 

        // map to temp variable
        this.tempArchiveData = this.rowsArchiveData.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });

        this.tempApprovedData = this.rowsApproveData.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };

        });
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  filterTable2($event) {
    let val = $event.target.value;
    console.log(val);
    // to do : filter and update tempApproved and tempArchived
    this.tempArchiveData = this.rowsArchiveData.filter(function (d) {
      for (var key in d) {
        if (d[key]!="" && d[key]!=null) {
          if (d[key].toString().toLowerCase().indexOf(val.toString().toLowerCase()) != -1) {
            return true;
          }
        } 
      }
      return false;
    });
    
  }

  filterTable($event) {
    let val = $event.target.value;
    console.log(val);
    // to do : filter and update tempApproved and tempArchived
    this.tempApprovedData = this.rowsApproveData.filter(function (d) {
      for (var key in d) {
        if (d[key]!="" && d[key]!=null) {
          if (d[key].toString().toLowerCase().indexOf(val.toString().toLowerCase()) != -1) {
            return true;
          }
        } 
      }
      return false;
    });
    
  }

}

