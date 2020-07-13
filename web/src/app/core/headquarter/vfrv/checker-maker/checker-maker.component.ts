import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as FromAirports from "src/app/variables/from-airports";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-checker-maker",
  templateUrl: "./checker-maker.component.html",
  styleUrls: ["./checker-maker.component.scss"]
})
export class CheckerMakerComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = FromAirports.FromAirports;
  SelectionType = SelectionType;

  // [{"id":1,"dateupload":"14/06/2019","username":"Corbin Harwood"},
  // {"id":2,"dateupload":"18/11/2019","username":"Robena Gascoyen"},
  // {"id":3,"dateupload":"28/01/2020","username":"Winny Koppes"},
  // {"id":4,"dateupload":"08/04/2019","username":"Lucas Hrishchenko"},
  // {"id":5,"dateupload":"09/06/2019","username":"Clim Margrett"}]

  // formInput
  formInput = {
    callsign: "",
    altmod: "",
    model: "",
    toa: "",
    operator: "",
    from: "",
    ata: "",
    to: "",
    atd: "",
    fr: "",
    tof: "",
    cl: "",
    total: "",
    remarks: ""
  };

  // searchInput
  searchInput = {
    callsign: "",
    model: "",
    operator: ""
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

    this.searchInput.callsign = "";
    this.searchInput.model = "";
    this.searchInput.operator = "";
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

  editWatchTower(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "Edit Watch Tower");
  }

  deleteWatchTower() {
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
