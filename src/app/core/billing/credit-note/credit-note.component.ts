import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/credit-note";
import { CreditDebitService } from 'src/app/shared/services/finance/credit-and-debit/credit-and-debit.service';
import { CreditDebit } from 'src/app/shared/services/finance/credit-and-debit/credit-and-debit.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})
export class CreditNoteComponent implements OnInit {

  // view data
  note_type : any;
  airline_cid : any;
  airline_name : any;
  airline_address : any;
  airline_email : any;
  airline_tel : any;
  airline_fax : any;
  cdate : any;
  note_amount : any;
  invoice_no : any;
  note_no: any;
  invoice_amount : any;


  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = [];

  // Data
  notes : CreditDebit[] = [];

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
    private noteService: CreditDebitService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.getAllData();
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    const user_id = this.authService.decodedToken().user_id;
    const body = {
      "user_id":user_id
    }
    this.noteService.getfiltered(body).subscribe(
    (res) => {
      this.notes = res;
      this.temp = this.notes.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

    },
    (err) => {
      console.log(err);
    });
  }
        
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.notes.filter(function (d) {
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

  openModal(modalRef: TemplateRef<any>, row) {
    // assign value to modal varialble
    this.note_type = row.note_type
    this.airline_cid = row.cid_id
    this.airline_name = row.company_name
    this.airline_address = row.company_address
    this.airline_email = row.company_email
    this.airline_tel = row.company_tel
    this.airline_fax =row.company_fax
    this.cdate = row.created_at_str
    this.invoice_no = row.invoice_id
    this.invoice_amount = row.invoice_amount
    this.note_amount = row.amount
    this.note_no = row.note_no
     
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }

  downloadpdf(id, company_name) {
    this.noteService.exportpdf({"id": id}).subscribe(
      (res) => {
        var filename = company_name + ".pdf"
        FileSaver.saveAs(res, filename)
      },
      (err) => {
      });
  }
  
}
