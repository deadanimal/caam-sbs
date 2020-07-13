import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as AirportLists from "src/app/variables/airport-lists";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-airport-list",
  templateUrl: "./airport-list.component.html",
  styleUrls: ["./airport-list.component.scss"],
})
export class AirportListComponent implements OnInit {
  entries: number = 5;
  airportSelected: any[] = [];
  airportTemp = [];
  airportActiveRow: any;
  airportRows = AirportLists.AirportLists;
  SelectionType = SelectionType;

  // formInput
  airportFormInput = {
    category: "",
    icaocode: "",
    airportname: "",
    country: "",
  };

  // searchInput
  airportSearchInput = {
    category: "",
    icaocode: "",
    airportname: "",
    country: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(public zone: NgZone, private modalService: NgbModal) {
    this.airportTemp = this.airportRows.map((prop, key) => {
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
    this.airportTemp = this.airportRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  searchAirportTable() {
    let object = this.airportSearchInput;
    this.airportTemp = this.airportRows.filter(function (d) {
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

  onAirportSelect({ selected }) {
    this.airportSelected.splice(0, this.airportSelected.length);
    this.airportSelected.push(...selected);
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
        centered: true,
        backdrop: 'static'
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

  createAirportList(content) {
    this.airportFormInput.category = "";
    this.airportFormInput.icaocode = "";
    this.airportFormInput.airportname = "";
    this.airportFormInput.country = "";

    this.open(content, "modal-mini", "sm", "Add New Airport");
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
