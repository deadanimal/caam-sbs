import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  focus
  focus1

  constructor() { }

  ngOnInit() {
  }

  doResetPassword(){
	window.location.href = 'https://caam-sbs.pipe.my/#/auth/login'
  }
  
}
