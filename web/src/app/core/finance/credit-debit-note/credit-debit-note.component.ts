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



@Component({
  selector: 'app-credit-debit-note',
  templateUrl: './credit-debit-note.component.html',
  styleUrls: ['./credit-debit-note.component.scss']
})
export class CreditDebitNoteComponent implements OnInit {

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
    this.FilterTable(this.filterby);
    this.getOrgs();
    this.getAllData();
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
    else if (this.filterby == 'transactionnumber') {
      this.temp = this.rows.filter(function (d) {
        return d.transactionnumber.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'transaction') {
      this.temp = this.rows.filter(function (d) {
        console.log("transaction")
        return d.transaction.toString().includes(search);
      })
    }
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


  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    // obtainToken
    // get userid
    // get extended user fields (request to v1/users/userid)
    // conditional get
    // if cuser_type=ALN
      // get user cid_id
      // post request with cid_id to Note route getFIlteredCID
    // elif cuser_type=HOD
      // basic get
    // elif cuser_type=APT, OPS
      // get by assignto
      // post request with assign_to Note route getFilteredAssignTo
    this.creditDebitService.get().subscribe(
      (res) => {
        this.notes = res;
      },
      (err) => {
      });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  viewData(row) {
  }

  openModal(modalRef: TemplateRef<any>, row) {
    this.viewData(row);
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

  exportPdf() {
  }
}


