import { Component, OnInit, ElementRef } from "@angular/core";
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";

import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { JwtService } from 'src/app/shared/handler/jwt/jwt.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  sidenavOpen: boolean = true;
  username: string;

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

  notifications = [
    {
      title: "You have 10 new approval need your attention",
      description: "Yus submitted a new approval request",
      time: "2 hrs ago",
      route: "/headquarter/approval/invoice-database-approval",
    },
    {
      title: "Late invoice payment reminder",
      description:
        "Aeronautical Radio of Thailand Ltd. has 30 days late from payment deadline",
      time: "3 hrs ago",
      route: "/headquarter/payment/checklist",
    },
    {
      title: "Late invoice payment reminder",
      description:
        "AIR CALEDONIE INTERNATIONAL has 60 days late from payment deadline",
      time: "4 hrs ago",
      route: "/headquarter/payment/checklist",
    },
  ];

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService
  ) {
    this.location = location;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        if (window.innerWidth < 1200) {
          document.body.classList.remove("g-sidenav-pinned");
          document.body.classList.add("g-sidenav-hidden");
          this.sidenavOpen = false;
        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    // this.listTitles = Routes.filter((listTitle) => listTitle);

    let user_obj = this.authService.decodedToken();
    this.username = user_obj.username;
  }
  getTitle() {
    // var titlee = this.location.prepareExternalUrl(this.location.path());
    // if (titlee.charAt(0) === "#") {
    //   titlee = titlee.slice(1);
    // }

    // for (var item = 0; item < this.listTitles.length; item++) {
    //   if (this.listTitles[item].path === titlee) {
    //     return this.listTitles[item].title;
    //   }
    // }
    return "Dashboard";
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }
  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }
  openSidebar() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }
  toggleSidenav() {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
      this.sidenavOpen = false;
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
      this.sidenavOpen = true;
    }
  }

  logout() {
    // routerLink="/auth/login"
    this.jwtService.destroyToken();
    this.router.navigate(['/auth/login']);
  }
}
