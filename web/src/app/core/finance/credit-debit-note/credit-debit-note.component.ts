import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/credit-debit-note";
import { CreditDebit } from 'src/app/shared/services/finance/credit-and-debit/credit-and-debit.model';
import { CreditDebitService } from 'src/app/shared/services/finance/credit-and-debit/credit-and-debit.service';
import { DatePipe } from '@angular/common';
import { OrganisationsModel } from 'src/app/shared/services/organisations/organisations.model';
import { OrganisationsService } from 'src/app/shared/services/organisations/organisations.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-credit-debit-note',
  templateUrl: './credit-debit-note.component.html',
  styleUrls: ['./credit-debit-note.component.scss']
})
export class CreditDebitNoteComponent implements OnInit {

  // detail view
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
  notes: any[];
  selected: any[] = [];
  temp = [];
  orgs: OrganisationsModel[] = [];
  activeRow: any;
  rows = dummylist.creditdebitlist;
  some: any;

  noteFormGroup: FormGroup


  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Data
  creditDebits: CreditDebit[] = [];

  // View Data

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
    private authService: AuthService,
    private creditDebitService: CreditDebitService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private orgService: OrganisationsService,

  ) {
    this.filterby = "all";
    this.searchText = "";
    this.noteFormGroup = this.formBuilder.group({

      id: new FormControl(""),
      note_type: new FormControl(""),
      amount: new FormControl(""),
      cid_id: new FormControl(""),
      remarks: new FormControl(""),
    });
    }

  ngOnInit() {
    this.getOrgs();
    this.getAllData();
  }

  
  // FilterDate() {
  //   let fromdate = this.fromDate
  //   let todate = this.toDate
  //   console.log(fromdate + " typeof " + typeof (todate))
  //   console.log(fromdate instanceof Date)

  //   if (fromdate && todate) {
  //     this.temp = this.rows.filter(function (d) {
  //       console.log(typeof (new Date(d.transactiondate)));
  //       console.log(new Date(d.transactiondate))
  //       return new Date(d.transactiondate) >= fromdate && new Date(d.transactiondate) <= todate;
  //     })
  //   }
  // }


  FilterDate() {
    let date:any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    console.log(date + " " + typeof(date))

    if (date) {
          this.temp = this.rows.filter(function (d) {
            return d.transactiondate == date
          })
        }
  }


  getAllData = () => {
    this.creditDebitService.get().subscribe(
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


  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>, row) {

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

  getOrgs() {
    this.orgService.get().subscribe(
      (res) => {
        console.log(res);
        this.orgs = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    this.creditDebitService.submit(this.noteFormGroup.value).subscribe(
    (res) => {
      console.log(res);
      this.closeModal();
      this.getAllData();
    },
    (err) => {
      console.log(err);
      this.closeModal();
    });
  }

  statusBadge(status: string) {
    if (status == "Overdue") return "badge badge-danger";
    if (status == "Disputed") return "badge badge-warning";
    if (status == "Partial") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
  }

  downloadpdf(id, company_name) {
    this.creditDebitService.exportpdf({"id": id}).subscribe(
      (res) => {
        var filename = company_name + ".pdf"
        FileSaver.saveAs(res, filename)
      },
      (err) => {
      });
  }

  exportPdf(value: string) {
    console.log("value", value)
    this.creditDebitService.exportList({"file_type":value}).subscribe(
      (res) => {
        let filename: string;
        console.log("this is res", res)
        if (value=="PDF") {
          filename = "credit_debit_list.pdf"
        }
        else if (value=="XLSX") {
          filename = "credit_debit_list.xlsx"
        }
        FileSaver.saveAs(res, filename)
      },
      (err) => {
        console.log("this is err")
        console.log(err)
      }
    )
  }

}


