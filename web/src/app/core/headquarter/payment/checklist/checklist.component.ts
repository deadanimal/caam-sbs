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
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.scss"]
})
export class ChecklistComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = OutputBillings.OutputBillings;
  SelectionType = SelectionType;

  formInput = {
    invoicenumber: "",
    invoicedate: "",
    companyname: "",
    totalamount: "",
    paymentamount: "",
    paymentdate: "",
    paymentstatus: "",
  };

  // searchInput
  searchInput = {
    invoicenumber: "",
    companyname: ""
  };

  // Modal
  closeResult: string;
  processTitle: string;

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

    this.searchInput.invoicenumber = "";
    this.searchInput.companyname = "";
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  // Modal Add New Customer
  open(content, type, modalDimension, processTitle) {
    this.processTitle = processTitle;
    // if (modalDimension === "sm" && type === "modal_mini") {
    this.modalService
      .open(content, {
        windowClass: "modal-mini",
        centered: true,
        backdrop: 'static',
        size: modalDimension
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

  editChecklist(row, content) {
    this.formInput = row;
    this.open(content, 'modal-mini', 'lg', 'Update Payment');
  }

  paymentStatus(invoicedate) {
    var date1 = new Date(invoicedate);
    var date2 = new Date();
    
    var diffTime = date2.getTime() - date1.getTime();
    var diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays <= 60) {
      return '<span class="badge badge-danger badge-lg">30 days late</span>';
    } else {
      return '<span class="badge badge-danger badge-lg">60 days late</span>';
    }
  }

  ngOnInit() {}
}
