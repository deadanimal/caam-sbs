import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as Users from "src/app/variables/utility/users";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = Users.Users;
  SelectionType = SelectionType;

  // FormGroup
  userFormGroup: FormGroup;

  // Dropdown
  organisations = [];
  userTypes = [
    {
      value: "HOD",
      display_name: "Head of Department",
    },
    {
      value: "FIN",
      display_name: "Finance",
    },
    {
      value: "OPS",
      display_name: "Operation",
    },
    {
      value: "APT",
      display_name: "Airport",
    },
    {
      value: "ALN",
      display_name: "Airline",
    },
    {
      value: "SAF",
      display_name: "SAF",
    },
    {
      value: "NAV",
      display_name: "Not Available",
    },
  ];

  // searchInput
  searchInput = {
    username: "",
    email: "",
    status: "",
    usertype: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    private authService: AuthService,
    private organisationService: OrganisationsService,
    private userService: UsersService
  ) {
    this.getUser();

    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      username: new FormControl(""),
      full_name: new FormControl(""),
      email: new FormControl(""),
      mobile: new FormControl(""),
      position: new FormControl(""),
      department: new FormControl(""),
      user_type: new FormControl(""),
      organisation: new FormControl(""),
      is_active: new FormControl(""),
      password1: "caam@2020",
      password2: "caam@2020",
    });

    this.organisationService.get().subscribe(
      (res) => {
        this.organisations = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    this.userService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.rows = res;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
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

    this.searchInput.username = "";
    this.searchInput.email = "";
    this.searchInput.status = "";
    this.searchInput.usertype = "";
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

  registerUser() {
    this.authService.register(this.userFormGroup.value).subscribe(
      (res) => {
        if (res) {
          // console.log("auth", res);
          this.userFormGroup.value.id = res.user.pk;

          this.userService
            .update(this.userFormGroup.value.id, this.userFormGroup.value)
            .subscribe(
              (res) => {
                // console.log("user", res);

                this.modalService.dismissAll();
                swal
                  .fire({
                    title: "Added!",
                    text: "New user has been added",
                    type: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok",
                    confirmButtonClass: "btn btn-success btn-sm",
                  })
                  .then((result) => {
                    if (result.value) {
                      this.getUser();
                    }
                  });
              },
              (err) => {
                console.error(err);
              },
              () => {
                () => console.log("HTTP request completed.");
              }
            );
        }
      },
      (err) => {
        console.error("err", err);
        // this.validation_forms = err.error;
      }
    )
  }

  editUser(row, content) {
    this.userFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit User");
  }

  deleteUser() {
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

  getUserType(value: string) {
    let result = this.userTypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  ngOnInit() {}
}
