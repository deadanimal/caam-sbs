
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/debit-note";
import { DebitNoteService } from 'src/app/shared/services/billing/debit-note/debit-note.service';
import { DebitNote } from 'src/app/shared/services/billing/debit-note/debit-note.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-debit-note',
  templateUrl: './debit-note.component.html',
  styleUrls: ['./debit-note.component.scss']
})
export class DebitNoteComponent implements OnInit {

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.debitnotelist;

   // Search Filter
   fromDate: Date;
   toDate: Date;
   filterby: String;
   searchText: String;

  // Data
  debitNotes: DebitNote[] = [];

  // searchInput
  searchInput = {
    invoicenumber: "",
    companyname: "",
  };

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
    private debitNoteService: DebitNoteService,
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
    else if (this.filterby == 'debitnumber') {
      this.temp = this.rows.filter(function (d) {
        return d.debitnumber.toLocaleLowerCase().includes(search);
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

  getAllData = () => {
    this.debitNoteService.get().subscribe(
      data => {
        this.debitNotes = data;
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

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }

}
