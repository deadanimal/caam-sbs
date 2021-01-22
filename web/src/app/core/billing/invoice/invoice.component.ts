import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { FpldatasService } from 'src/app/shared/services/fpldatas/fpldatas.service';
import { DisputeService } from 'src/app/shared/services/dispute/dispute.service';
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/invoice";
import { InvoicesService} from 'src/app/shared/services/finance/invoice/invoices.service';
import { Invoice } from 'src/app/shared/services/finance/invoice/invoices.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  isValid: boolean;
  movementreport : FpldatasModel[] = [];
  movementreportStaged : FpldatasModel[] = [];
  remarkForm: FormGroup;

  cid_id:string;
  disputeStage: boolean = false;
  fplToDispute: any[] = [];
  disputeBody: any;

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.invoicelist;

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Data
  invoices: any;

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
    private invoiceService: InvoicesService,
    private disputeService: DisputeService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private userService: UsersService,
    private fplService: FpldatasService,
    private formBuilder: FormBuilder,
  ) {
    this.filterby = "all";
    this.searchText = "";
    this.remarkForm = this.formBuilder.group({
      remark: new FormControl(""),     
    });
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.FilterTable(this.filterby);
    this.getFpls();
    this.unstageDispute();
  }

  stagingDispute() {
    this.disputeStage = true;
  }

  unstageDispute() {
    this.disputeStage = false;
    this.fplToDispute = [];
    this.fplService.unstage().subscribe(
      (res) => {
        this.getFpls();
        console.log(res);
      }, 
      (err) => {
        console.log(err);
    });
  }

  submit() {
    this.disputeStage = false;
    this.disputeBody = {
      'cid': this.cid_id,  
      'remarks': this.remarkForm.value['remark'],
      'fpl_ids': this.fplToDispute,
    }

    console.log(this.disputeBody);

      this.disputeService.submit(this.disputeBody).subscribe(
      (res) => {
        this.unstageDispute();
      },
      (err) => {});
  }

  archive(id) {
    this.fplService.stage({'id':id}).subscribe(
      (res) => {
        this.fplToDispute.push(id);
        console.log(this.fplToDispute);
        this.getFpls();
      },
      (err) => {
        console.log(err);
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
    let date:any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    console.log(date + " " + typeof(date))

    if (date) {
          this.temp = this.rows.filter(function (d) {
            return d.invoicedate == date
          })
        }
  }
  // user specific invoice 
  // obtainToken -> user_id -> get extended user fields -> usercid -> flter invoice using cid
  getFpls() {
    let userObj = this.authService.decodedToken();
    let userId = userObj.user_id
    this.userService.getOne(userId).subscribe(
      (res) => {
        this.cid_id = res.cid_id
        this.getInvoices();
        let postFilter = {
            'cid_id':this.cid_id
          }
        this.fplService.getFilteredMonthly(postFilter).subscribe(
          (res) => {
            var temp = [];
            this.movementreport = res;
            for (var i=0; i < res.length; i++) {
              if (res[i].staged == true) {
                temp.push(res[i]);
              }
            }
            this.movementreportStaged = temp;
            console.log("staged", this.movementreportStaged);
          },
          (err) => {
            console.log(err)
        });

      },
      (err) => {
        console.log("err", err)
    });

  }

  getInvoices() {
    this.invoiceService.getfilteredCID({'cid_id':this.cid_id}).subscribe(
    (res) => {
      this.invoices = res;
      console.log(this.invoices);
    },
    (err) => {
      console.log(err);
    });
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

  statusBadge(status: string) {
    if (status == "Overdue") return "badge badge-danger";
    if (status == "Disputed") return "badge badge-warning";
    if (status == "Partial") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
  }
}
