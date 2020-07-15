import { Component, OnInit } from '@angular/core';
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;
import swal from "sweetalert2";

@Component({
  selector: 'app-vfr',
  templateUrl: './vfr.component.html',
  styleUrls: ['./vfr.component.scss']
})
export class VfrComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    new Dropzone(document.getElementsByClassName("dropzone-single")[0], {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-single"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
        .innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      }
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }

  swalDistributed() {
    swal.fire({
      title: "Success",
      text: "Invoice successfully created and distributed to customers",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
  }

}
