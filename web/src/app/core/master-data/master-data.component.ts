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
    this.filterby = "";
    this.searchText = "";
    this.searchText2 = "";
    this.getFplData()
  }

  ngOnInit() {
    // this.spinner.show();

    // setTimeout(() => {
    //      this.spinner.hide();
    // }, 10000);
  }

  // To get data on table FlightData
  getFplData() {
    this.spinner.show();
    this.rowsApproveData = [];
    this.rowsArchiveData = [];
    let from_date = this.fromDate
    let to_date = this.toDate
    from_date = this.datePipe.transform(from_date, 'yyyy/MM/dd');
    to_date = this.datePipe.transform(to_date, 'yyyy/MM/dd');
    if (this.filterby == "fpl_date_ts") { this.searchText = from_date; this.searchText2 = to_date}

    this.fpldataService
      .filter_masterdata("field_by=" + this.filterby + "&field=" + this.searchText + "&field2=" + this.searchText2).subscribe((res) => {
        console.log("res", res);
        this.datas = res;
        let index = 0;

        // get fpldatas status = approved
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status == 'FPL4') {
            this.rowsApproveData[index] = this.datas[i];
            index = index + 1
          }
        }

        // get fpldatas status = archive
        index = 0;
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status == 'FPL3') {
            this.rowsArchiveData[index] = this.datas[i];
            index = index + 1
          }
        }

        this.tempApprovedData = this.rowsApproveData.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });

        this.tempArchiveData = this.rowsArchiveData.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });
        this.spinner.hide();

      },
        error => {
          console.error("err", error);
          this.spinner.hide();
        });
  }

  searchAll(){
    this.fromDate="";
    this.toDate="";
    this.searchText ="";
    this.getFplData();
  }

  resetFilter(){
    this.fromDate="";
    this.toDate="";
    this.searchText ="";
    this.filterby ="";
    this.getFplData();
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }
}

