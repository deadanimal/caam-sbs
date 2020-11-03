
import { Component, OnInit, NgZone, TemplateRef, Input } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/payment/payment";
import { Payment } from 'src/app/shared/services/payment/payment/payment.model';
import { PaymentService } from 'src/app/shared/services/payment/payment/payment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  montantAnnuel: number;

  // Checker
  isLoading: boolean = false

  // Form
  createManualForm: FormGroup
  createOnlineForm: FormGroup
  registerManualFormMessages = {
    'amount': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Enter a valid amount' }
    ],
    'attachment': [
      { type: 'required', message: 'Attachment is required.' },
      { type: 'pattern', message: 'Please upload a file' }
    ],
  };
  registerOnlineFormMessages = {
    'amount': [
      { type: 'required', message: 'Amount is required.' },
      { type: 'pattern', message: 'Enter a valid amount' }
    ],
    'paymentmethod': [
      { type: 'required', message: 'Payment method is required.' }
    ],
  };

  active = 1;
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.paymentlist;

  // Data
  payments: Payment[] = [];

  // searchInput
  searchInput;

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };

  constructor(
    private formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: BsModalService,
    private paymentService: PaymentService,
    private toastr: NotifyService
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  ngOnInit() {
    this.createManualForm = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[0-9]*$/')
      ])),
      remark: new FormControl(),
      attachment: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.createOnlineForm = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('/^[0-9]*$/')
      ])),
      paymentmethod: new FormControl('', Validators.compose([
        Validators.required
      ])),
      summary: new FormControl(),
    });
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

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toString().toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  searchTable() {
    let object = this.searchInput;
    this.temp = this.rows.filter(function (d) {
      for (var key in object) {
        if (object[key]) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(object[key].toString().toLowerCase()) !== -1
          )
            return true;
        }
      }
      return false;
    });
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
    if (status == "Overdue") return "badge badge-warning";
    if (status == "Pending") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
    if (status == "Failed") return "badge badge-danger";
  }
}

