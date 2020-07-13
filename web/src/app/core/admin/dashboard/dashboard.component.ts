import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

}
