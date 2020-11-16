import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PaymentListNewPayment } from 'src/app/shared/services/payment/payment-list-new-payment/payment-list-new-payment.model';
import { PaymentListNewPaymentService } from 'src/app/shared/services/payment/payment-list-new-payment/payment-list-new-payment.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  // Search Filter
  filterby: String;
  searchText: String;

  // Table
  active = 1;
  entries: number = 5;
  activeRow: any;

  // Data
  tempPaymentListNew =[]
  paymentListNew: PaymentListNewPayment[] = [];
  selectedNewPayment: PaymentListNewPayment;
  dummy = [
    {
      cid: '1',
      companyname: "ABC",
      date: '05/30/2019',
      paymentmethod: 'debit card',
      paymentamount: 34535,
      receiveamount: 24356
    }
  ]

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg",
  };
  modaltype: String;

  constructor(
    private paymentListNewPaymentService: PaymentListNewPaymentService,
    private modalService: BsModalService,
    private toastr: NotifyService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  // getNewPaymentData = () => {
  //   this.paymentListNewPaymentService.get().subscribe(
  //     data => {
  //       this.paymentListNew = data;
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>, row:any, type:string) {
    this.modaltype = type;
    this.selectedNewPayment = row
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    

  }

  updateData() {
    swal
      .fire({
        title: "Submit",
        text: "Are you want submit the changes?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, submit it",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.paymentListNewPaymentService
            .update(this.selectedNewPayment.id,this.selectedNewPayment)
            .subscribe(
              (res) => {
                console.log("res", res);
                this.spinner.hide();
                swal
                  .fire({
                    title: "Success",
                    text: "The submission has successfully recorded",
                    type: "success",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                  })
                  .then((result) => {
                    if (result.value) {
                      this.modal.hide();
                    }
                  });
              },
              (err) => {
                console.error("err", err);
                this.spinner.hide();
              }
            );
        }
      });
  }

  closeModal() {
    this.modal.hide()
  }

}

