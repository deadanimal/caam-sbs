
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/movement-report";
import { FpldatasService } from 'src/app/shared/services/fpldatas/fpldatas.service';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-movement-report',
  templateUrl: './movement-report.component.html',
  styleUrls: ['./movement-report.component.scss']
})


export class MovementReportComponent implements OnInit {

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;

  movementreport : FpldatasModel[] = [];

  cid_id:string;
  

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Data
  movementReports: FpldatasModel[] = [];
  // public url: string = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg",
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private fplService: FpldatasService,
    private authService: AuthService,
    private userService: UsersService,
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.getAllData();
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }
  getAllData = () => {
    // to do: 
    // get current user cid_id
    // use cid_id as body -> post
    // display specific user fpl data
    let userObj = this.authService.decodedToken();
    let userId = userObj.user_id
    this.userService.getOne(userId).subscribe(
      (res) => {
        this.cid_id = res.cid_id
        let postFilter = {
            'cid_id':this.cid_id
          }
        this.fplService.getFiltered(postFilter).subscribe(
          (res) => {
            this.movementreport = res;
            this.temp = this.movementreport.map((prop, key) => {
               return {
                 ...prop,
                 // id: key,
                 no: key,
               };
             });


            console.log(this.movementreport)
          },
          (err) => {
            console.log(err)
        });

      },
      (err) => {
        console.log("err", err)
    });

    console.log(userObj)
    
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.movementreport.filter(function (d) {
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


  entriesChange($event) {
    this.entries = $event.target.value;
  }



  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }


}

