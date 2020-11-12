import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as AircraftTypes from "src/app/variables/aircraft-types";
import swal from "sweetalert2";

import { AircraftsService } from "src/app/shared/services/aircrafts/aircrafts.service";
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { UsersService } from 'src/app/shared/services/users/users.service';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-aircrafts",
  templateUrl: "./aircrafts.component.html",
  styleUrls: ["./aircrafts.component.scss"],
})
export class AircraftsComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = AircraftTypes.AircraftTypes;
  SelectionType = SelectionType;

  // Forms
  aircraftFormGroup: FormGroup;

  // Dropdowns
  manufacturers = [];
  operators = [];

  // searchInput
  searchInput = {
    aircraftmodel: "",
    weight: "",
    weightcategory: "",
    variantaircraft: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    private aircraftService: AircraftsService,
    public authService: AuthService,
    private organisationService: OrganisationsService,
    private userService: UsersService,
  ) {
    this.getAircraft();

    this.aircraftFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      description: new FormControl(""),
      registration_num: new FormControl(""),
      model: new FormControl(""),
      manufacturer: new FormControl(""),
      aircraft_type: new FormControl(""),
      weight_category: new FormControl(""),
      weight: new FormControl(""),
      rate: new FormControl(""),
      operator: new FormControl(""),
      is_active: new FormControl(""),
    });

    this.organisationService.filter("organisation_type=AL").subscribe(
      (res) => {this.operators = res;},
      (err) => {console.log("err", err)}
    );

    this.organisationService.filter("organisation_type=MN").subscribe(
      (res) => {this.manufacturers = res;},
      (err) => {console.log("err", err)}
    );
  }

  getAircraft() {
    this.aircraftService.get().subscribe(
      (res) => {
        if (res) {
          this.rows = res;
          this.temp = this.rows.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
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

  resetTable() {
    this.temp = this.rows;

    this.searchInput.aircraftmodel = "";
    this.searchInput.weight = "";
    this.searchInput.weightcategory = "";
    this.searchInput.variantaircraft = "";
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
        size: "lg",
        centered: true,
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

  create(content) {
    this.open(content, "modal-mini", "sm", "Add New Aircraft");
  }

  edit(row, content) {
    this.aircraftFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit Aircraft");
  }

  delete() {
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
    if (this.processTitle == "Add New Aircraft") {
      this.aircraftService.post(this.aircraftFormGroup.value).subscribe(
        (res) => {
          if (res) {
            swal
              .fire({
                title: "Success",
                text: "The submission has successfully created",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
              })
              .then((result) => {
                if (result.value) {
                  this.modalService.dismissAll();
                  this.getAircraft();
                }
              });
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.processTitle == "Edit Aircraft") {
      this.aircraftService
        .update(this.aircraftFormGroup.value.id, this.aircraftFormGroup.value)
        .subscribe(
          (res) => {
            if (res) {
              swal
                .fire({
                  title: "Success",
                  text: "The submission has successfully updated",
                  type: "success",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                })
                .then((result) => {
                  if (result.value) {
                    this.modalService.dismissAll();
                    this.getAircraft();
                  }
                });
            }
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  ngOnInit() {}
}
