import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as OutputBillings from "src/app/variables/output-billings";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-register-invoice",
  templateUrl: "./register-invoice.component.html",
  styleUrls: ["./register-invoice.component.scss"]
})
export class RegisterInvoiceComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = OutputBillings.OutputBillings;
  SelectionType = SelectionType;

  // formInput
  formInput = {
    ln: "",
    ctg: "",
    date: "",
    fplno: "",
    actype: "",
    dep: "",
    dest: "",
    route: "",
    dist: "",
    rate: "",
    amount: ""
  };

  // searchInput
  searchInput = {
    ctg: "",
    startdate: "",
    enddate: "",
    fplno: "",
    dep: "",
    dest: ""
  };

  // Modal
  closeResult: string;
  processTitle: string;
  process: string = "empty";
  value = "CAAM";

  constructor(public zone: NgZone, private modalService: NgbModal) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  searchTable() {
    let object = this.searchInput;
    this.temp = this.rows.filter(function(d) {
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

  resetTable() {
    this.temp = this.rows;

    this.searchInput.ctg = "";
    this.searchInput.startdate = "";
    this.searchInput.enddate = "";
    this.searchInput.fplno = "";
    this.searchInput.dep = "";
    this.searchInput.dest = "";
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  // Modal Add New Customer
  open(content, type, modalDimension, processTitle, process) {
    this.processTitle = processTitle;
    this.process = process;
    // if (modalDimension === "sm" && type === "modal_mini") {
    this.modalService
      .open(content, {
        windowClass: "modal-mini",
        centered: true,
        size: modalDimension,
        backdrop: 'static'
      })
      .result.then(
        result => {
          this.closeResult = "Closed with: $result";
        },
        reason => {
          this.closeResult = "Dismissed $this.getDismissReason(reason)";
        }
      );
    // }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return "with: $reason";
    }
  }

  openRegisterInvoice(row, content) {
    this.open(content, "", "", "Invoice", "invoice");
  }

  editRegisterInvoice(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "View Register Invoice", "view");
  }

  deleteRegisterInvoice() {
    swal
      .fire({
        title: "Reason to delete?",
        type: "warning",
        input: 'textarea',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Submit",
        cancelButtonClass: "btn btn-secondary"
      })
      .then(result => {
        if (result.value) {
          // Show confirmation
          swal.fire({
            title: "Deleted!",
            text: "Thank you. Your submission has been recorded.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary"
          }).then();
        } else {
          swal.showValidationMessage('Please input reason to delete.');
        }
      });
  }

  clickPayment() {
    swal.fire({
      title: "Payment",
      text: "Payment will be redirected to other website to proceed. Please be patient for a while. Thank you.",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-primary"
    }).then(result => {
      if (result.value) {
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit() {}
}
