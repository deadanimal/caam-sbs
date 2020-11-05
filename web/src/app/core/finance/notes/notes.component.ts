import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as Exemptions from "src/app/variables/exemptions";
import swal from "sweetalert2";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = Exemptions.Exemptions;
  SelectionType = SelectionType;

  // formInput
  formInput = {
    type: "",
    callsign: "",
    description: "",
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

  createExemption(content) {
    this.formInput.type = "";
    this.formInput.callsign = "";
    this.formInput.description = "";

    this.open(content, "modal-mini", "sm", "Add New Exemption");
  }

  editExemption(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "Edit Exemption");
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
