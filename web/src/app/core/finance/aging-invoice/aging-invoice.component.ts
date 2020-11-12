import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/aging-invoice";
import { AgingInvoicesService } from 'src/app/shared/services/finance/aging-invoice/aging-invoice.service';
import { AgingInvoice } from 'src/app/shared/services/finance/aging-invoice/aging-invoice.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aging-invoice',
  templateUrl: './aging-invoice.component.html',
  styleUrls: ['./aging-invoice.component.scss']
})
export class AgingInvoiceComponent implements OnInit {

  page = 1;

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.aginginvoicelist;

  // Filter get data in row.invoice
  invoicedates: any = [];
  invoicenos: any = [];

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;
  filterDate = [];

  // Data
  agingInvoices: AgingInvoice[] = [];

  // View Data
  companyname: string;
  invoicedate: string;
  invoicenumber: string;

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg"
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private agingInvoiceService: AgingInvoicesService,
    private datePipe: DatePipe
  ) {
    this.filterby = "all";
    this.searchText = "";
    // this.getDataInInvoice();
  }

  ngOnInit() {
    this.FilterTable(this.filterby);
  }
  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  // getDataInInvoice() {
  //   let index = 0;
  //   let date = "01/01/2020";

  //   if (this.rows != null) {
  //     for (let i = 0; i < this.rows.length; i++) {
  //       console.log("i " + i)
  //       for (let x = 0; x < this.rows[i].invoice.length; x++) {
  //         console.log("x " + x)
  //         this.invoicedates[index] = this.rows[i].invoice[x].invoicedate
  //         this.invoicenos[index] = this.rows[i].invoice[x].invoicenumber
  //         index = index + 1

  //         if (date == this.rows[i].invoice[x].invoicedate) {
  //           this.temp[i] = this.rows[i]
  //           console.log("true")
  //         }
  //       }
  //     }
  //     console.log(this.temp)
  //     // console.log(this.invoicedates)
  //     // console.log(this.invoicenos)
  //   }
  // }

  FilterTable(field) {
    let search = field.toLocaleLowerCase();
    let tempAll = [];


    if (this.filterby == 'all') {
      for (let i = 0; i < 15; i++) {
        if (this.rows[i] != null) { tempAll[i] = this.rows[i]; }
      }

      return this.temp = tempAll;

    }
    else if (this.filterby == 'companyname') {
      this.temp = this.rows.filter(function (d) {
        return d.companyname.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'invoicenumber') {
      this.temp = this.rows.filter(function (d) {
        return d.invoicenumber.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'status') {
      this.temp = this.rows.filter(function (d) {
        return d.status.toLocaleLowerCase().includes(search);
      })
    }
  }

  // FilterDate() {
  //   let fromdate = this.fromDate
  //   let todate = this.toDate

  //   if (fromdate && todate) {
  //     this.temp = this.rows.filter(function (d) {
  //       return new Date(d.invoicedate) >= fromdate && new Date(d.invoicedate) <= todate;
  //     })
  //   }
  // }


  FilterDate() {
    let date: any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    let index = 0;

    if (this.rows != null) {
      for (let i = 0; i < this.rows.length; i++) {
        console.log("i " + i)
        for (let x = 0; x < this.rows[i].invoice.length; x++) {
          console.log("x " + x)
          this.invoicedates[index] = this.rows[i].invoice[x].invoicedate
          this.invoicenos[index] = this.rows[i].invoice[x].invoicenumber
          index = index + 1

          if (date == this.rows[i].invoice[x].invoicedate) {
            this.temp[i] = this.rows[i]
            console.log("true")
          }
        }
      }
      return this.temp
      // console.log(this.invoicedates)
      // console.log(this.invoicenos)
    }

  }


  getAllData = () => {
    this.agingInvoiceService.get().subscribe(
      data => {
        this.agingInvoices = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  viewData(row) {
    this.companyname = row.companyname;
    this.invoicedate = row.invoicedate;
    this.invoicenumber = row.invoicenumber;
  }

  openModal(modalRef: TemplateRef<any>, row) {
    this.viewData(row);
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }



}
