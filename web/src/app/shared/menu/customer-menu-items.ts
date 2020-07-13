export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
// Menu Items
export const CUSTOMERROUTES: RouteInfo[] = [
  {
    path: "/customer/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red"
  },
  {
    path: "/customer/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      {
        path: "airline-information",
        title: "Airline Information",
        type: "link"
      },
      // { path: 'aerodrome-information', title: 'Aerodrome Information', type: 'link' },
      {
        path: "aircraft-type-information",
        title: "Aircraft Type Information",
        type: "link"
      },
      {
        path: "aviation-route",
        isCollapsed: true,
        title: "Aviation Route",
        type: "sub",
        collapse: "aviationroute",
        children: [
          { path: "routelist-kk", title: "Kota Kinabalu", type: "link" },
          { path: "routelist-semenanjung", title: "Semenanjung", type: "link" },
          { path: "routelist-kuc", title: "Kuching", type: "link" }
        ]
      },
      // {
      //   path: "flight-rule-and-flight-category",
      //   title: "Flight Rule and Flight Category",
      //   type: "link"
      // },
      {
        path: "fpl-data-fpexclusion-multiple-callsign",
        title: "Multiple Callsign",
        type: "link"
      }
      // { path: 'anfc-legacy-application-interface', title: 'ANFC Legacy Application Interface', type: 'link' }
    ]
  },
  {
    path: "/customer/finance",
    title: "Finance",
    type: "sub",
    icontype: "fas fa-dollar-sign text-green",
    collapse: "finance",
    isCollapsed: true,
    children: [
      { path: "invoice", title: "Invoice", type: "link" },
      { path: "aging-invoice", title: "Aging Invoice", type: "link" },
      // { path: "checklist-invoice", title: "Checklist Invoice", type: "link" },
      // { path: "exemptions", title: "Exemptions", type: "link" },
      { path: "charges", title: "Charges", type: "link" }
    ]
  },
  {
    path: "/customer/payment",
    title: "Payment",
    type: "sub",
    icontype: "fas fa-receipt text-primary",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "checklist", title: "Checklist", type: "link" },
      { path: "report-list", title: "Report List", type: "link" },
      { path: "advanced-payment-report-list", title: "Advanced Payment Report List", type: "link" },
      { path: "payment-summary-report", title: "Payment Summary Report", type: "link" },
      { path: "outstanding-payment", title: "Outstanding Payment", type: "link" },
      { path: "outstanding-payment-surcharge", title: "Outstanding Payment Surcharge", type: "link" }
    ]
  },
  {
    path: "/customer/statement-account-report",
    title: "Statement of Account Report",
    type: "link",
    icontype: "fas fa-receipt text-primary"
  },
  {
    path: "/customer/credit-debit-note-report",
    title: "Credit and Debit Note Report",
    type: "link",
    icontype: "fas fa-receipt text-primary"
  },
  /* {
    path: "/customer/utility",
    title: "Utility",
    type: "sub",
    icontype: "fas fa-tools text-info",
    collapse: "utility",
    isCollapsed: true,
    children: [
      { path: "user", title: "User", type: "link" },
      { path: "user-privilege", title: "User Privilege", type: "link" },
      { path: "audit-trail", title: "Audit Trail", type: "link" }
    ]
  }, */
  /* {
    path: "/customer/report",
    title: "Reporting",
    type: "sub",
    icontype: "fas fa-chart-bar text-blue",
    collapse: "reporting",
    isCollapsed: true,
    children: [
      { path: "operation", title: "Operation", type: "link" },
      { path: "finance", title: "Finance", type: "link" }
    ]
  }, */
  /* {
    path: "/customer/management",
    title: "Management",
    type: "link",
    icontype: "fas fa-tasks text-pink"
  }, */
  {
    path: "/customer/invoice",
    title: "Invoice",
    type: "link",
    icontype: "fas fa-file-invoice-dollar text-yellow"
  },
  // {
  //   path: "/customer/vfr",
  //   title: "VFR",
  //   type: "link",
  //   icontype: "fas fa-hdd text-orange"
  // },
  /* {
    path: "/customer/vfrv",
    title: "VFR and TFL",
    type: "sub",
    icontype: "fas fa-hdd text-orange",
    collapse: "vfrv",
    isCollapsed: true,
    children: [
      { path: "watch-tower", title: "Watch Tower", type: "link" },
      { path: "upload", title: "Upload", type: "link" },
      { path: "vfr-list", title: "List of VFR and TFL", type: "link" },
      { path: "checker-maker", title: "Checker Maker", type: "link" },
    ]
  }, */
  {
    path: "/customer/analysis",
    title: "Big Data Analysis",
    type: "link",
    icontype: "fas fa-globe-asia text-indigo"
  }
];

/*
{
  path: '',
  title: '',
  type: 'link',
  icontype: ''
}
*/
