import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/payment/payment";
import * as banklist from "src/app/variables/bank-lists";
import * as companylist from "src/app/variables/companies";
import { Payment } from 'src/app/shared/services/payment/payment/payment.model';
import { PaymentService } from 'src/app/shared/services/payment/payment/payment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  montantAnnuel: number;

  // Checker
  isLoading: boolean = false

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Form
  createManualForm: FormGroup
  createOnlineForm: FormGroup
  registerManualFormMessages = {
    'amount_receive': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Enter a valid amount' }
    ],
    'remark': [
      { type: 'required', message: 'Remark is required.' },
    ],
    'company': [
      { type: 'required', message: 'Company is required.' }
    ],
    'attachment': [
      { type: 'required', message: 'Attachment is required.' },
    ],
  };
  registerOnlineFormMessages = {
    'amount_receive': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Enter a valid amount' }
    ],
    'company': [
      { type: 'required', message: 'Company is required.' }
    ],
    'payment_method': [
      { type: 'required', message: 'Please select payment method' }
    ],
  };

  active = 1;
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  
  // Data
  payments: Payment[] = [];
  rows = dummylist.paymentlist;
  banks= banklist.Banks;
  company_names = companylist.Companies;
  viewData = {
    date: "",
    amount: "",
    remark: "",
    paymentmethod: "",
    attachment: "",
  }

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg",
  };

  constructor(
    private formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: BsModalService,
    private paymentService: PaymentService,
    private toastr: NotifyService,
    private datePipe: DatePipe
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.getAllData();
    // here to change form 
    this.createManualForm = this.formBuilder.group({
      amount_receive: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*)))(\\.\\d{1,2})?$')
      ])),
      remark: new FormControl('', Validators.compose([
        Validators.required
      ])),
      company: new FormControl('', Validators.compose([
        Validators.required
      ])),
      attachment: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.createOnlineForm = this.formBuilder.group({
      amount_receive: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*)))(\\.\\d{1,2})?$')
      ])),
      company: new FormControl('', Validators.compose([
        Validators.required
      ])),
      payment_method: new FormControl('', Validators.compose([
        Validators.required
      ])),
      summary: new FormControl(),
    });
    this.FilterTable(this.filterby);
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
    else if (this.filterby == 'paymenttype') {
      this.temp = this.rows.filter(function (d) {
        return d.paymenttype.toLocaleLowerCase().includes(search);
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
  //       return new Date(d.date) >= fromdate && new Date(d.date) <= todate;
  //     })
  //   }
  // }

  FilterDate() {
    let date:any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    console.log(date + " " + typeof(date))

    if (date) {
          this.temp = this.rows.filter(function (d) {
            return d.date == date
          })
        }
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  submitManualForm() {
    console.log(this.createManualForm.value)
    this.isLoading = true
    this.paymentService.manual(this.createManualForm.value).subscribe(
      () => {
        // Success
        this.isLoading = false
        this.closeModal();
        this.getAllData();
      },
      () => {
        // Failed
        this.isLoading = false
      },
      () => {
        // After
        this.toastr.openToastr('', 'Successfully Submitted')
      }
    )
  }

  submitOnlineForm() {
    console.log(this.createOnlineForm.value)
    this.isLoading = true
    this.paymentService.online(this.createOnlineForm.value).subscribe(
      () => {
        // Success
        this.isLoading = false
        this.closeModal();
        this.getAllData();
      },
      () => {
        // Failed
        this.isLoading = false
        this.closeModal()

      },
      () => {
        // After
        this.toastr.openToastr('', 'Requesting')
      }
    )
  }

  getAllData = () => {
    console.log("im called")
    this.paymentService.get().subscribe(
      data => {
        this.payments = data;
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

  openModal(modalRef: TemplateRef<any>, data:any) {
    this.viewData.amount = data.amount_receive;
    this.viewData.attachment = data.attachment;
    this.viewData.remark = data.remark;
    this.viewData.date = data.created_at;
    this.viewData.paymentmethod = data.payment_method;
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    

  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure want to cancel?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonClass: "btn btn-dark",
      cancelButtonText: "Back to Payment"
    }).then((result) => {
      if (result.value) {
        this.modal.hide()
      }
      else{}
    })
  }

  closeModal() {
    this.modal.hide()
  }

  statusBadge(status: string) {
    if (status == "UNAPPROVED") return "badge badge-warning";
    // if (status == "Pending") return "badge badge-primary";
    if (status == "APPROVED") return "badge badge-success";
    // if (status == "Failed") return "badge badge-danger";
  }
}

