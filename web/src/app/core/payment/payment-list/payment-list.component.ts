import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/shared/services/payment/payment/payment.model';
import { PaymentService } from 'src/app/shared/services/payment/payment/payment.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  approved_payments: Payment[] = [];
  unapproved_payments: Payment[] = [];
  approved_amount: any;

  temp = [];
  temp2 = [];

  // Search Filter
  filterby: String;
  searchText: String;

  // Table
  active = 1;
  entries: number = 5;
  activeRow: any;

  // Data
  tempPaymentListNew = []
  // paymentListNew: PaymentListNewPayment[] = [];
  // selectedNewPayment: PaymentListNewPayment;
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

  // selectedNewPayment for detail view
  id: string;
  cid: string;
  company_name: string;
  online: boolean;
  approved: boolean;
  created_at: any;
  modified_at: any;
  code: string;
  payment_method: string;
  remark: string;
  attachment: any;
  amount_receive: number;
  summary: string;


  constructor(
    private modalService: BsModalService,
    private paymentService: PaymentService,
    private toastr: NotifyService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
  ) { 
  }

  ngOnInit() {
    this.getPaymentData();
  }

  download(attachment) {
    window.open(attachment);
  }


  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.unapproved_payments.filter(function (d) {
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

  filterTable2($event) {
    let val = $event.target.value;
    this.temp2 = this.approved_payments.filter(function (d) {
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




  onActivate(event) {
    this.activeRow = event.row;
  }

  selectedNewPayment(row) {
    this.id = row.id;
    this.cid = row.cid;
    this.company_name = row.company_name;
    this.online = row.online;
    this.approved = row.approved;
    this.created_at = row.created_at;
    this.modified_at = row.modified_at;
    this.code = row.code;
    this.payment_method = row.payment_method;
    this.remark = row.remark;
    this.attachment = row.attachment;
    this.amount_receive = row.amount_receive;
    this.summary = row.summary;
  }

  openModal(modalRef: TemplateRef<any>, row: any, type: string) {
    this.modaltype = type;
    this.selectedNewPayment = row
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  getPaymentData = () => {
    this.unapproved_payments = [];
    this.approved_payments = [];
    this.paymentService.get().subscribe(
      data => {
        this.filterPayment(data);
      },
      error => {
        console.log(error)
      }
    )
  }

  // updateData() {
  //   swal
  //     .fire({
  //       title: "Submit",
  //       text: "Are you want submit the changes?",
  //       type: "question",
  //       showCancelButton: true,
  //       buttonsStyling: false,
  //       confirmButtonClass: "btn btn-dark",
  //       confirmButtonText: "Yes, submit it",
  //       cancelButtonClass: "btn btn-secondary",
  //       cancelButtonText: "No",
  //     })
  //     .then((result) => {
  //       if (result.value) {
  //         this.spinner.show();
  //         this.paymentListNewPaymentService
  //           .update(this.selectedNewPayment.id,this.selectedNewPayment)
  //           .subscribe(
  //             (res) => {
  //               console.log("res", res);
  //               this.spinner.hide();
  //               swal
  //                 .fire({
  //                   title: "Success",
  //                   text: "The submission has successfully recorded",
  //                   type: "success",
  //                   buttonsStyling: false,
  //                   confirmButtonClass: "btn btn-success",
  //                 })
  //                 .then((result) => {
  //                   if (result.value) {
  //                     this.modal.hide();
  //                   }
  //                 });
  //             },
  //             (err) => {
  //               console.error("err", err);
  //               this.spinner.hide();
  //             }
  //           );
  //       }
  //     });
  // }

  closeModal() {
    this.modal.hide()
  }

  updateData(data) {
    swal
      .fire({
        title: "Approve Payment",
        text: "Do you want approve this payment?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, submit it",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result)=>{
        if (result.value) {
          this.spinner.show()
          const body = {
            "payment_id": data,
            "approved_amount": this.approved_amount
          }
          this.paymentService.approve(body).subscribe(
            data => {
              console.log(data)
              this.closeModal()
              this.spinner.hide()
              this.getPaymentData()
              
            },
            error => {
              console.log(error)
              this.closeModal()
              this.spinner.hide()
            }
          )    
        } else {
          console.log("dismissed")
        }

      })   
    
  }

  filterPayment(data) {
    var tempApproved = [];
    var tempUnapproved = [];
    console.log("this is filterpayment fn")
    for (var i = 0; i < data.length; i++) {
      if (data[i].approved == true) {
        tempApproved.push(data[i])
        this.approved_payments = tempApproved
        this.temp2 = this.approved_payments.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });


      } else {
        tempUnapproved.push(data[i]);
        this.unapproved_payments = tempUnapproved
        this.temp = this.unapproved_payments.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

      }
    }
    console.log(this.temp2);
    console.log(this.unapproved_payments)
  }
  exportPdf(value: string) {
    console.log("value", value)
    this.paymentService.exportList({"file_type":value}).subscribe(
      (res) => {
        let filename: string;
        console.log("this is res", res)
        if (value=="PDF") {
          filename = "payments_list.pdf"
        }
        else if (value=="XLSX") {
          filename = "payments_list.xlsx"
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

