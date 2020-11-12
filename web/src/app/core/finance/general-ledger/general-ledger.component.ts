import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/general-ledger";
import { GeneralLedgerService } from 'src/app/shared/services/finance/general-ledger/general-ledger.service';
import { GeneralLedger } from 'src/app/shared/services/finance/general-ledger/general-ledger.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.scss']
})
export class GeneralLedgerComponent implements OnInit {

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.generalledgerlist;

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Data
  generalLedger: GeneralLedger[] = [];


  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog"
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private generalLedgerService: GeneralLedgerService,
    private datePipe: DatePipe
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.FilterTable(this.filterby);
  }

  getAllData = () => {
    this.generalLedgerService.get().subscribe(
      data => {
        this.generalLedger = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  FilterTable(field) {
    let search = field.toLocaleLowerCase();
    let tempAll =[];
    

    if (this.filterby == 'all') {
      for (let i = 0; i < 15; i++) {
        if(this.rows[i] != null)
        {tempAll[i] = this.rows[i];}
      }

      return this.temp = tempAll;
       
    }
    else if (this.filterby == 'companyname') {
      this.temp = this.rows.filter(function (d) {
        return d.companyname.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'transactioncode') {
      this.temp = this.rows.filter(function (d) {
        return d.transactioncode.toLocaleLowerCase().includes(search);
      })
    }
  }

  // FilterDate() {
  //   let fromdate = this.fromDate
  //   let todate = this.toDate

  //   if (fromdate && todate) {
  //     this.temp = this.rows.filter(function (d) {
  //       return new Date(d.activitydate) >= fromdate && new Date(d.activitydate) <= todate;
  //     })
  //   }
  // }

  FilterDate() {
    let date:any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    console.log(date + " " + typeof(date))

    if (date) {
          this.temp = this.rows.filter(function (d) {
            return d.activitydate == date
          })
        }
  }

  onActivate(event) {
    this.activeRow = event.row;
  }


  openModal(modalRef: TemplateRef<any>, row) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }



}

