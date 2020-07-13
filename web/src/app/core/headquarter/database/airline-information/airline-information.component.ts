import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as Companies from "src/app/variables/companies";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-airline-information",
  templateUrl: "./airline-information.component.html",
  styleUrls: ["./airline-information.component.scss"],
})
export class AirlineInformationComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = Companies.Companies;
  SelectionType = SelectionType;

  // formInput

  formInput = {
    cid: "",
    icode: "",
    iata: "",
    companyname: "",
    picname: "",
    email: "",
    email2: "",
    email3: "",
    email4: "",
    telno: "",
    address: "",
    pr: "",
  };

  // searchInput
  searchInput = {
    companyname: "",
    email: "",
    telno: "",
    address: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(public zone: NgZone, private modalService: NgbModal) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
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
    this.temp = this.rows.filter(function (d) {
      for (var key in object) {
        if (object[key]) {
          if (d[key].toLowerCase().indexOf(object[key]) !== -1) return true;
        }
      }
      return false;
    });
  }

  resetTable() {
    this.temp = this.rows;

    this.searchInput.companyname = "";
    this.searchInput.email = "";
    this.searchInput.telno = "";
    this.searchInput.address = "";
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
        size: "lg",
        backdrop: "static",
      })
      .result.then(
        (result) => {
          this.closeResult = "Closed with: $result";
        },
        (reason) => {
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

  createCompanies(content) {
    this.formInput.cid = "";
    this.formInput.icode = "";
    this.formInput.iata = "";
    this.formInput.companyname = "";
    this.formInput.picname = "";
    this.formInput.email = "";
    this.formInput.email2 = "";
    this.formInput.email3 = "";
    this.formInput.email4 = "";
    this.formInput.telno = "";
    this.formInput.address = "";
    this.formInput.pr = "";

    this.open(content, "modal-mini", "sm", "Add New Companies");
  }

  editCompanies(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "Edit Companies");
  }

  deleteCompanies() {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary",
      })
      .then((result) => {
        if (result.value) {
          // Show confirmation
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary",
          });
        }
      });
  }

  getRowClass = (row) => {
    return {
      "row-color1": row.cid % 2 == 0,
      "row-color2": row.cid % 2 == 1,
    };
  };

  submit() {
    swal.fire({
      title: "Success",
      text: "The submission has successfully recorded",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
    }).then(result => {
      if (result.value) {
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit() {}
}
