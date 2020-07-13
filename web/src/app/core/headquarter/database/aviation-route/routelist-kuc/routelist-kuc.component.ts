import { Component, OnInit, NgZone } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as RouteListKuc from "src/app/variables/routelist-kuc";
import swal from "sweetalert2";
import * as L from "leaflet";

const dataMarkers = [
  { lat: 12.854649, long: 96.240234, acmodel: 'A109', callsign: 'MARITIME700', dep: 'WSSL', dest: 'OMDW', fplno: 'A6CBO' },
  { lat: 12.854649, long: 96.240234, acmodel: 'A319', callsign: 'GADING TAJAM', dep: 'LBSF', dest: 'WIHH', fplno: 'ABP932' },
  { lat: 5.922045, long: 106.875, acmodel: 'A320', callsign: 'ADV01', dep: 'VTSM', dest: 'OMDW', fplno: 'ABP941' },
  { lat: 4.303311, long: 93.47168, acmodel: 'A321', callsign: '9MIMW', dep: 'WSSS', dest: 'VIDP', fplno: 'AOJ84K' },
  { lat: 10.185187, long: 88.725586, acmodel: 'A330', callsign: 'T7LKT', dep: 'VTSP', dest: 'VCBI', fplno: 'AXY0408' },
  { lat: 5.178482, long: 101.293945, acmodel: 'AT402', callsign: 'N9688R', dep: 'WMKK', dest: 'VANP', fplno: 'AZS4901' },
  { lat: -2.372369, long: 102.788086, acmodel: 'AW139', callsign: '9MHCB', dep: 'WMKK', dest: 'M765', fplno: 'AZS6602' },
  { lat: 3.250209, long: 101.655182, acmodel: 'B722', callsign: '9MAUB', dep: 'ZGGG', dest: 'WSSS', fplno: 'B3277' },
  { lat: 9.102097, long: 103.183594, acmodel: 'B732', callsign: 'FALCON110', dep: 'VHHH', dest: 'WMSA', fplno: 'B602U' },
  { lat: 8.276727, long: 94.394531, acmodel: 'B742', callsign: '9MLEO', dep: 'ZSHC', dest: 'WMKL', fplno: 'B7766' },
  { lat: 0.527336, long: 100.458984, acmodel: 'B772', callsign: 'T7LKT', dep: 'WSSL', dest: 'VTSM', fplno: 'B7795' },
  { lat: -5.353521, long: 103.623047, acmodel: 'BE19', callsign: 'BAB08', dep: 'RCSS', dest: 'WMKL', fplno: 'B9998' },
  { lat: 11.953349, long: 114.169922, acmodel: 'BH206', callsign: 'MAR700', dep: 'WSSL', dest: 'ZUCK', fplno: 'BWJ083' },
  { lat: -11.436955, long: 112.148438, acmodel: 'BH407', callsign: '9MAUB', dep: 'WSSL', dest: 'VRMM', fplno: 'BWJ988' },
  { lat: -16.045813, long: 99.140625, acmodel: 'C12', callsign: 'N110TP', dep: 'AYPY', dest: 'WMSA', fplno: 'CGGPM' }
];

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

@Component({
  selector: "app-routelist-kuc",
  templateUrl: "./routelist-kuc.component.html",
  styleUrls: ["./routelist-kuc.component.scss"]
})
export class RoutelistKucComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = RouteListKuc.RoutelistKuc;
  SelectionType = SelectionType;

  leafletOptions = {
    layers: [
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19
        }
      )
    ],
    zoom: 5,
    center: L.latLng(4.2105, 101.9758)
  };

  markerLayer: L.Layer[] = [];

  // formInput

  formInput = {
    rtid: "",
    dep: "",
    dest: "",
    dist: "",
    routedesc: "",
    ctg: "",
    tof: ""
  };

  // searchInput
  searchInput = {
    dep: "",
    dest: "",
    tof: "",
    routedesc: ""
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

    this.searchInput.dep = "";
    this.searchInput.dest = "";
    this.searchInput.tof = "";
    this.searchInput.routedesc = "";
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

  createRoute(content) {
    this.formInput.rtid = "";
    this.formInput.dep = "";
    this.formInput.dest = "";
    this.formInput.dist = "";
    this.formInput.routedesc = "";
    this.formInput.ctg = "";
    this.formInput.tof = "";

    this.open(content, "modal-mini", "sm", "Add New Route");
  }

  editRoute(row, content) {
    this.formInput = row;
    this.open(content, "modal-mini", "sm", "Edit Route");
  }

  deleteRoute() {
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

  loadMarkers() {
    dataMarkers.forEach(marker => {
      this.markerLayer.push(
        L.marker([marker.lat, marker.long], {
          icon: L.icon({
            iconSize: [35, 35],
            iconUrl: "assets/img/marker/plane.svg",
            className: "plane-rotation"
          })
        }).on("click", function() {
          swal.fire({
            html: "Model of Aircraft: " + marker.acmodel + "<br/>Callsign: " + marker.callsign + "<br/>DEP: " + marker.dep + "<br/>DEST: " + marker.dest + "<br/>FPL NO: " + marker.fplno,
            title: "Flight Detail",
            text: "",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-dark"
          });
        })
      );
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

  ngOnInit() {
    this.loadMarkers();
  }
}
