import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AirportRoutes, FinanceRoutes, HodRoutes, OperationRoutes, AirlineRoutes, SafRoutes } from '../../shared/menu/menu-items';
//import { CUSTOMERROUTES } from '../shared/menu/customer-menu-items';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

var misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService
    ) {}

  ngOnInit() {
    
    let currentUser = this.authService.decodedToken();
    let role = currentUser.user_type;

    if (role == "APT") {
      this.menuItems = AirportRoutes.filter(menuItem => menuItem);
    }
    if (role == "OPS") {
      this.menuItems = OperationRoutes.filter(menuItem => menuItem);
    }
    if (role == "HOD") {
      this.menuItems = HodRoutes.filter(menuItem => menuItem);
    }
    if (role == "FIN") {
      this.menuItems = FinanceRoutes.filter(menuItem => menuItem);    
    }
    if (role == "ALN") {
      this.menuItems = AirlineRoutes.filter(menuItem => menuItem);  
    }
    if (role == "SAF") {
      this.menuItems = SafRoutes.filter(menuItem => menuItem);      
    }

    console.log(role)
    console.log(this.menuItems)
    

  }
  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
