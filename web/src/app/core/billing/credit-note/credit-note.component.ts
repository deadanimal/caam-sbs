
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/credit-note";
import { CreditNoteService } from 'src/app/shared/services/billing/credit-note/credit-note.service';
import { CreditNote } from 'src/app/shared/services/billing/credit-note/credit-note.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})
export class CreditNoteComponent implements OnInit {

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.creditnotelist;

  // Data
  creditNotes: CreditNote[] = [];

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg",
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private creditNoteService: CreditNoteService,
    private datePipe: DatePipe
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.FilterTable(this.filterby);
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    this.creditNoteService.get().subscribe(
      data => {
        this.creditNotes = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  FilterTable(field) {
    let search = field.toLocaleLowerCase();
    let tempAll = [];


    if (this.filterby == 'all') {
      for (let i = 0; i < 15; i++) {
        if (this.rows[i] != null) { tempAll[i] = this.rows[i]; }
      }

      return this.temp = tempAll;

    }
    else if (this.filterby == 'invoicenumber') {
      this.temp = this.rows.filter(function (d) {
        return d.invoicenumber.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'creditnumber') {
      this.temp = this.rows.filter(function (d) {
        return d.creditnumber.toLocaleLowerCase().includes(search);
      })
    }
  }

  // FilterDate() {
  //   let fromdate = this.fromDate
  //   let todate = this.toDate

  //   if (fromdate && todate) {
  //     this.temp = this.rows.filter(function (d) {
  //       return new Date(d.issuedate) >= fromdate && new Date(d.issuedate) <= todate;
  //     })
  //   }
  // }

  FilterDate() {
    let date:any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    console.log(date + " " + typeof(date))

    if (date) {
          this.temp = this.rows.filter(function (d) {
            return d.issuedate == date
          })
        }
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }
}
