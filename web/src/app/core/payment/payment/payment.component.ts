import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/payment/payment";
import * as banklist from "src/app/variables/bank-lists";
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
    'amount': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Enter a valid amount' }
    ],
    'remark': [
      { type: 'required', message: 'Remark is required.' },
    ],
    'attachment': [
      { type: 'required', message: 'Attachment is required.' },
    ],
  };
  registerOnlineFormMessages = {
    'amount': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Enter a valid amount' }
    ],
    'paymentmethod': [
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
    this.createManualForm = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*)))(\\.\\d{1,2})?$')
      ])),
      remark: new FormControl('', Validators.compose([
        Validators.required
      ])),
      attachment: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.createOnlineForm = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*)))(\\.\\d{1,2})?$')
      ])),
      paymentmethod: new FormControl('', Validators.compose([
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
    this.paymentService.post(this.createManualForm.value).subscribe(
      () => {
        // Success
        this.isLoading = false
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
    this.paymentService.post(this.createOnlineForm.value).subscribe(
      () => {
        // Success
        this.isLoading = false
      },
      () => {
        // Failed
        this.isLoading = false
      },
      () => {
        // After
        this.toastr.openToastr('', 'Requesting')
      }
    )
  }

  getAllData = () => {
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
    this.viewData.amount = data.amount;
    this.viewData.attachment = data.attachment;
    this.viewData.remark = data.remark;
    this.viewData.date = data.date;
    this.viewData.paymentmethod = data.paymentmethod;
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    

  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure want to cancel?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-dark",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: "Back to Page"
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
    if (status == "Overdue") return "badge badge-warning";
    if (status == "Pending") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
    if (status == "Failed") return "badge badge-danger";
  }
}

