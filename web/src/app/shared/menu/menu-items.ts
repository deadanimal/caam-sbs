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
export const ROUTES: RouteInfo[] = [
  {
    path: "/headquarter/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },
  {
    path: "/headquarter/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      {
        path: "rate",
        title: "Rate",
        type: "link",
      },
      {
        path: "airline",
        title: "Airline",
        type: "link",
      },
      {
        path: "callsign",
        title: "Callsign",
        type: "link",
      },
      // { path: 'aerodrome-information', title: 'Aerodrome Information', type: 'link' },
      {
        path: "aircraft",
        title: "Aircraft",
        type: "link",
      },
      {
        path: "airport",
        title: "Airport",
        type: "link",
      },
      {
        path: "route",
        isCollapsed: true,
        title: "Route",
        type: "sub",
        collapse: "route",
        children: [
          { path: "semenanjung", title: "Semenanjung", type: "link" },
          { path: "kk", title: "Kota Kinabalu", type: "link" },
          { path: "kuc", title: "Kuching", type: "link" },
        ],
      },
      {
        path: "exemptions",
        title: "Exemptions",
        type: "link",
      },
      // {
      //   path: "flight-rule-and-flight-category",
      //   title: "Flight Rule and Flight Category",
      //   type: "link"
      // },
      // { path: 'anfc-legacy-application-interface', title: 'ANFC Legacy Application Interface', type: 'link' }
    ],
  },
  {
    path: "/headquarter/vfrv",
    title: "Data Management",
    type: "sub",
    icontype: "fas fa-hdd text-orange",
    collapse: "vfrv",
    isCollapsed: true,
    children: [
      // { path: "watch-tower", title: "Watch Tower", type: "link" },
      { path: "upload", title: "Upload", type: "link" },
      { path: "database", title: "Database", type: "link" },
      { path: "generate-invoice", title: "Generate Invoice", type: "link" },
      // { path: "vfr-list", title: "List of VFR and TFL", type: "link" },
      // { path: "checker-maker", title: "Checker Maker", type: "link" },
    ],
  },
  {
    path: "/headquarter/approval",
    title: "Approval",
    type: "sub",
    icontype: "fas fa-signature text-dark",
    collapse: "approval",
    isCollapsed: true,
    children: [
      {
        path: "invoice-database-approval",
        title: "Invoice and Database Approval",
        type: "link",
      },
      {
        path: "monthly-invoice-approval",
        title: "Monthly Invoice Approval",
        type: "link",
      },
    ],
  },
  {
    path: "/headquarter/finance",
    title: "Finance",
    type: "sub",
    icontype: "fas fa-dollar-sign text-green",
    collapse: "finance",
    isCollapsed: true,
    children: [
      { path: "invoice-list", title: "Invoice List", type: "link" },
      // { path: "register-invoice", title: "Register Invoice", type: "link" },
      { path: "aging-invoice", title: "Aging Invoice", type: "link" },
      {
        path: "statement-account-report",
        title: "Statement of Account Report",
        type: "link",
      },
      {
        path: "credit-debit-note-report",
        title: "Credit and Debit Note Report",
        type: "link",
      },
      // { path: "checklist-invoice", title: "Checklist Invoice", type: "link" },
      // { path: "exemptions", title: "Exemptions", type: "link" },
      // { path: "charges", title: "Charges", type: "link" }
    ],
  },
  {
    path: "/headquarter/payment",
    title: "Payment",
    type: "sub",
    icontype: "fas fa-receipt text-primary",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "checklist", title: "Checklist", type: "link" },
      { path: "payment-list", title: "Payment List", type: "link" },
      {
        path: "deposit-report-list",
        title: "Deposit Report List",
        type: "link",
      },
      {
        path: "outstanding-payment",
        title: "Outstanding Payment",
        type: "link",
      },
    ],
  },
  // {
  //   path: "/headquarter/statement-account-report",
  //   title: "Statement of Account Report",
  //   type: "link",
  //   icontype: "fas fa-receipt text-primary"
  // },
  // {
  //   path: "/headquarter/credit-debit-note-report",
  //   title: "Credit and Debit Note Report",
  //   type: "link",
  //   icontype: "fas fa-receipt text-primary"
  // },
  {
    path: "/headquarter/report",
    title: "Reporting",
    type: "sub",
    icontype: "fas fa-chart-bar text-blue",
    collapse: "reporting",
    isCollapsed: true,
    children: [
      { path: "operation", title: "Operation Report", type: "link" },
      { path: "finance", title: "Finance Report", type: "link" },
      {
        path: "airline-management",
        title: "Airline Management Report",
        type: "link",
      },
      {
        path: "payment-summary",
        title: "Payment Summary Report",
        type: "link",
      },
    ],
  },
  {
    path: "/headquarter/analysis",
    title: "Big Data Analysis",
    type: "link",
    icontype: "fas fa-globe-asia text-indigo",
  },
  {
    path: "/headquarter/utility",
    title: "Utility",
    type: "sub",
    icontype: "fas fa-tools text-info",
    collapse: "utility",
    isCollapsed: true,
    children: [
      { path: "user", title: "User", type: "link" },
      { path: "user-privilege", title: "User Privilege", type: "link" },
      { path: "audit-trail", title: "Audit Trail", type: "link" },
    ],
  },
  // {
  //   path: "/headquarter/management",
  //   title: "Management",
  //   type: "link",
  //   icontype: "fas fa-tasks text-pink",
  // },
  // {
  //   path: "/headquarter/invoice",
  //   title: "Invoice",
  //   type: "link",
  //   icontype: "fas fa-file-invoice-dollar text-yellow",
  // },
  // {
  //   path: "/headquarter/vfr",
  //   title: "VFR",
  //   type: "link",
  //   icontype: "fas fa-hdd text-orange"
  // },
];
