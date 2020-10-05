import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as RateLists from "src/app/variables/rate-lists";
import * as AirportLists from "src/app/variables/airport-lists";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-flight-rule-and-flight-category",
  templateUrl: "./flight-rule-and-flight-category.component.html",
  styleUrls: ["./flight-rule-and-flight-category.component.scss"]
})
export class FlightRuleAndFlightCategoryComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  airportSelected: any[] = [];
  temp = [];
  airportTemp = [];
  activeRow: any;
  airportActiveRow: any;
  rows = RateLists.RateLists;
  airportRows = AirportLists.AirportLists;
  SelectionType = SelectionType;

  // formInput
  formInput = {
    ln: "",
    rateid: "",
    lowerweightlimit: "",
    upperweightlimit: "",
    raterm: ""
  };

  // searchInput
  searchInput = {
    ln: "",
    rateid: "",
    lowerweightlimit: "",
    upperweightlimit: "",
    raterm: ""
  };

  // formInput
  airportFormInput = {
    category: "",
    icaocode: "",
    airportname: "",
    country: ""
  };

  // searchInput
  airportSearchInput = {
    category: "",
    icaocode: "",
    airportname: "",
    country: ""
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

    this.airportTemp = this.airportRows.map((prop, key) => {
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

    this.searchInput.ln = "";
    this.searchInput.rateid = "";
    this.searchInput.lowerweightlimit = "";
    this.searchInput.upperweightlimit = "";
    this.searchInput.raterm = "";
  }

  searchAirportTable() {
    let object = this.airportSearchInput;
    this.airportTemp = this.airportRows.filter(function(d) {
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

  resetAirportTable() {
    this.airportTemp = this.airportRows;

    this.airportSearchInput.category = "";
    this.airportSearchInput.icaocode = "";
    this.airportSearchInput.airportname = "";
    this.airportSearchInput.country = "";
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onAirportSelect({ selected }) {
    this.airportSelected.splice(0, this.airportSelected.length);
    this.airportSelected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  onAirportActivate(event) {
    this.airportActiveRow = event.row;
  }

  // Modal Add New Customer
  open(content, type, modalDimension, processTitle) {
    this.processTitle = processTitle;
    // if (modalDimension === "sm" && type === "modal_mini") {
    this.modalService
      .open(content, {
        windowClass: "modal-mini",
        centered: true
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

  editRateList(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "Edit Rate");
  }

  deleteRateList() {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary"
      })
      .then(result => {
        if (result.value) {
          // Show confirmation
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary"
          });
        }
      });
  }

  editAirportList(row, content) {
    this.airportFormInput = row;
    this.open(content, "modal-mini", "sm", "Edit Airport");
  }

  deleteAirportList() {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary"
      })
      .then(result => {
        if (result.value) {
          // Show confirmation
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary"
          });
        }
      });
  }

  ngOnInit() {}
}
