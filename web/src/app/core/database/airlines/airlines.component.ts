import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as Companies from "src/app/variables/companies";
import swal from "sweetalert2";

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { UsersService } from 'src/app/shared/services/users/users.service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from "ngx-spinner";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-airlines",
  templateUrl: "./airlines.component.html",
  styleUrls: ["./airlines.component.scss"],
})
export class AirlinesComponent implements OnInit {
  list_of_errors: string;
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = []; //Companies.Companies;
  SelectionType = SelectionType;
  createUserForm: any;

  airlineFormGroup: FormGroup;

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

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    public authService: AuthService,
    private organisationService: OrganisationsService,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
  ) {
    this.getAirline();

    // update form - to suport user creation & airline creation

    this.airlineFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      shortname: new FormControl(""),
      cid_id: new FormControl(""),
      is_active: new FormControl(""),
      organisation_type: new FormControl("AL"),
      email_1: new FormControl(""),
      email_2: new FormControl(""),
      email_3: new FormControl(""),
      email_4: new FormControl(""),
      office_num: new FormControl(""),
      mobile_num: new FormControl(""),
      fax_number: new FormControl(""),
      pic_name: new FormControl(""),
      pic_num: new FormControl(""),
      pic_email: new FormControl(""),
      pic_position: new FormControl(""),
      pic_department: new FormControl(""),
      address_line_1: new FormControl(""),
      address_line_2: new FormControl(""),
      address_line_3: new FormControl(""),
      postcode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl(""),
      type: new FormControl(""),
      icoa: new FormControl(""),
      iata: new FormControl(""),      
    });
  }

  ngOnInit() {}

  submit() {
    // patch role value == "ALN" into temp formgroup var
    // todo -> register user throught auth/registration
          // reconstruct post body to match with user registration
          // reconstruct post body to match with updateUser
    // notify user (email)
    // updateUser  
    // extra call another API -> to create new airline using the same form

    this.createUserForm = this.airlineFormGroup.value
    this.createUserForm.email = this.airlineFormGroup.value.pic_email
    this.createUserForm.username = this.airlineFormGroup.value.pic_name
    this.createUserForm.full_name = this.airlineFormGroup.value.pic_name
    this.createUserForm.mobile = this.airlineFormGroup.value.pic_num
    this.createUserForm.position = this.airlineFormGroup.value.position
    this.createUserForm.department = this.airlineFormGroup.value.department
    this.createUserForm.user_type = 'ALN'
    this.createUserForm.company_name = this.airlineFormGroup.value.name
    this.createUserForm.password1 = "abc123def"
    this.createUserForm.password2 = "abc123def"

    this.authService.registerAccount(this.createUserForm).subscribe(
    (res) => {
      if(res) {
        // notify user when registered succesfully
        this.notifyUsers(res); 

        // update user field
        this.userService.update(res.user.pk, this.createUserForm).subscribe(
          (res) => {
            console.log(res)
          },
          (err) => {
            console.log("extended user field not updated", err) 
          });

        // create new airline object
        this.organisationService.post(this.airlineFormGroup.value).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log("airline not created", err);
          });

        this.modalService.dismissAll();
      }
    },
    (err) => {
        console.log("user not created", err)
    });
  }

  notifyUsers(res) {
    console.log("notify data",res)
    this.userService.notification(res).subscribe(
      (res) => {
        console.log("notification success", res);
      }, 
      (err) => {
        console.log("notification error", err);
      });
  }

  getAirline() {
    let filter = "organisation_type=AL";
    this.organisationService.filter(filter).subscribe(
      (res) => {
        console.log("res", res);
        this.rows = res;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            id: key,
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

  exportPdf(value: string) {
    console.log("value", value)
    this.spinner.show()
    this.organisationService.exportpdf({"file_type":value}).subscribe(
      (res) => {
        let filename: string;
        console.log("this is res", res)
        if (value=="PDF") {
          filename = "Airline.pdf"
        }
        else if (value=="XLSX") {
          filename = "Airline.xlsx"
        }
        FileSaver.saveAs(res, filename)
        this.spinner.hide()
      },
      (err) => {
        console.log("this is err")
        console.log(err)
        this.spinner.hide()
      }
    )
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

  create(content) {
    this.open(content, "modal-mini", "sm", "Add New Airline");
  }

  edit(row, content) {
    this.airlineFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit Airline");
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

  getRowClass = (row) => {
    return {
      "row-color1": row.cid % 2 == 0,
      "row-color2": row.cid % 2 == 1,
    };
  };

}
