import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import swal from "sweetalert2";

import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-organisation",
  templateUrl: "./organisation.component.html",
  styleUrls: ["./organisation.component.scss"],
})
export class OrganisationComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = [];
  SelectionType = SelectionType;

  // Dropdown
  organisation_types = [];

  // Forms
  organisationFormGroup: FormGroup;

  // searchInput
  searchInput = {
    name: "",
    email: "",
    organisation_type: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    private organisationService: OrganisationsService
  ) {
    this.getOrganisation();

    this.organisationFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      shortname: new FormControl(""),
      cid: new FormControl(""),
      is_active: new FormControl(""),
      organisation_type: new FormControl(""),
      email_1: new FormControl(""),
      email_2: new FormControl(""),
      email_3: new FormControl(""),
      email_4: new FormControl(""),
      office_num: new FormControl(""),
      mobile_num: new FormControl(""),
      fax_number: new FormControl(""),
      pic_name: new FormControl(""),
      pic_num: new FormControl(""),
      address_line_1: new FormControl(""),
      address_line_2: new FormControl(""),
      address_line_3: new FormControl(""),
      postcode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl(""),
    });
  }

  getOrganisation() {
    this.organisationService.get().subscribe(
      (res) => {
        if (res) {
          this.rows = res;
          this.temp = res.map((prop, key) => {
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
      },
      () => {
        console.log("Http request is completed");
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
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
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

    this.searchInput.name = "";
    this.searchInput.email = "";
    this.searchInput.organisation_type = "";
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
        backdrop: false,
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

  submit() {
    console.log("processTitle", this.processTitle);
    if (this.processTitle == "Add New Organisation") {
      this.organisationService.post(this.organisationFormGroup.value).subscribe(
        (res) => {
          console.log("res", res);
          if (res) {
            if (this.processTitle == "")
              swal
                .fire({
                  title: "Success",
                  text: "Your record have been successfully created!",
                  type: "success",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                })
                .then((result) => {
                  if (result.value) {
                    this.modalService.dismissAll();
                    this.getOrganisation();
                  }
                });
          }
        },
        (err) => {
          console.error("err", err);
        },
        () => {
          console.log("Http request is completed");
        }
      );
    } else if (this.processTitle == "Edit Organisation") {
      this.organisationService
        .update(
          this.organisationFormGroup.value.id,
          this.organisationFormGroup.value
        )
        .subscribe(
          (res) => {
            console.log("res", res);
            if (res) {
              if (this.processTitle == "")
                swal
                  .fire({
                    title: "Success",
                    text: "Your record have been successfully updated!",
                    type: "success",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                  })
                  .then((result) => {
                    if (result.value) {
                      this.modalService.dismissAll();
                      this.getOrganisation();
                    }
                  });
            }
          },
          (err) => {
            console.error("err", err);
          },
          () => {
            console.log("Http request is completed");
          }
        );
    }
  }

  edit(row, content) {
    this.organisationFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit Organisation");
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

  ngOnInit() {}
}
