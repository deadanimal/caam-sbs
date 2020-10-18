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


export const AirlineRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },
  {
    path: "/app/finance",
    title: "Finance",
    icontype: "fas fa-file-invoice-dollar text-green",
    type: "sub",
    collapse: "finance",
    isCollapsed: true,
    children: [
      {
        path: "invoices",
        title: "Invoice",
        type: "link",
      },    
      {
        path: "notes",
        title: "Note",
        type: "link",
      },           
      {
        path: "payments",
        title: "Payment",
        type: "link",
      },          
    ]
  },
  {
    path: "/app/movement",
    title: "Movement",
    type: "link",
    icontype: "fas fa-plane text-blue",
  },  

];

export const AirportRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      {
        path: "aircraft",
        title: "Aircraft",
        type: "link",
      },      
      {
        path: "airline",
        title: "Airline",
        type: "link",
      },
      {
        path: "airport",
        title: "Airport",
        type: "link",
      },      
      {
        path: "callsign",
        title: "Callsign",
        type: "link",
      },
      {
        path: "exemptions",
        title: "Exemptions",
        type: "link",
      },      
      {
        path: "rate",
        title: "Rate",
        type: "link",
      },   
      {
        path: "route",
        title: "Route",
        type: "link",
      },            
      // {
      //   path: "route",
      //   isCollapsed: true,
      //   title: "Route",
      //   type: "sub",
      //   collapse: "route",
      //   children: [
      //     { path: "semenanjung", title: "Semenanjung", type: "link" },
      //     { path: "kk", title: "Kota Kinabalu", type: "link" },
      //     { path: "kuc", title: "Kuching", type: "link" },
      //   ],
      // },
    ],
  },
  {
    path: "/app/tflvfr",
    title: "TFL / VFR",
    type: "link",
    icontype: "fas fa-hdd text-orange",
    // collapse: "tflvfr",
    // isCollapsed: true,
    // children: [
    //   { path: "upload", title: "Upload", type: "link" },
    //   { path: "history", title: "History", type: "link" },
    // ],
  },
];

export const OperationRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      {
        path: "aircraft",
        title: "Aircraft",
        type: "link",
      },      
      {
        path: "airline",
        title: "Airline",
        type: "link",
      },
      {
        path: "airport",
        title: "Airport",
        type: "link",
      },      
      {
        path: "callsign",
        title: "Callsign",
        type: "link",
      },
      {
        path: "exemptions",
        title: "Exemptions",
        type: "link",
      },      
      {
        path: "rate",
        title: "Rate",
        type: "link",
      },   
      {
        path: "route",
        title: "Route",
        type: "link",
      },            
      // {
      //   path: "route",
      //   isCollapsed: true,
      //   title: "Route",
      //   type: "sub",
      //   collapse: "route",
      //   children: [
      //     { path: "semenanjung", title: "Semenanjung", type: "link" },
      //     { path: "kk", title: "Kota Kinabalu", type: "link" },
      //     { path: "kuc", title: "Kuching", type: "link" },
      //   ],
      // },
    ],
  },
  {
    path: "/app/task",
    title: "Task",
    type: "sub",
    icontype: "fas fa-hdd text-orange",
    collapse: "task",
    isCollapsed: true,
    children: [
      { path: "tflvfr", title: "TFL/VFR", type: "link" },
      { path: "dispute", title: "Dispute", type: "link" },
    ],
  },
];

export const SafRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },

];

export const HodRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      {
        path: "aircraft",
        title: "Aircraft",
        type: "link",
      },      
      {
        path: "airline",
        title: "Airline",
        type: "link",
      },
      {
        path: "airport",
        title: "Airport",
        type: "link",
      },      
      {
        path: "callsign",
        title: "Callsign",
        type: "link",
      },
      {
        path: "exemptions",
        title: "Exemptions",
        type: "link",
      },      
      {
        path: "rate",
        title: "Rate",
        type: "link",
      },   
      {
        path: "route",
        title: "Route",
        type: "link",
      },            
      // {
      //   path: "route",
      //   isCollapsed: true,
      //   title: "Route",
      //   type: "sub",
      //   collapse: "route",
      //   children: [
      //     { path: "semenanjung", title: "Semenanjung", type: "link" },
      //     { path: "kk", title: "Kota Kinabalu", type: "link" },
      //     { path: "kuc", title: "Kuching", type: "link" },
      //   ],
      // },
    ],
  },
  {
    path: "/app/task",
    title: "Task",
    type: "sub",
    icontype: "fas fa-hdd text-orange",
    collapse: "task",
    isCollapsed: true,
    children: [
      { path: "invoice", title: "Invoice", type: "link" },
      { path: "dispute", title: "Dispute", type: "link" },
      { path: "history", title: "History", type: "link" },
    ],
  },
];

export const FinanceRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-red",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      {
        path: "aircraft",
        title: "Aircraft",
        type: "link",
      },      
      {
        path: "airline",
        title: "Airline",
        type: "link",
      },
      {
        path: "airport",
        title: "Airport",
        type: "link",
      },      
      {
        path: "callsign",
        title: "Callsign",
        type: "link",
      },
      {
        path: "exemptions",
        title: "Exemptions",
        type: "link",
      },      
      {
        path: "rate",
        title: "Rate",
        type: "link",
      },   
      {
        path: "route",
        title: "Route",
        type: "link",
      },            
    ],
  },
  {
    path: "/app/task",
    title: "Task",
    type: "sub",
    icontype: "fas fa-hdd text-orange",
    collapse: "task",
    isCollapsed: true,
    children: [
      { path: "invoice", title: "Invoice", type: "link" },
      { path: "dispute", title: "Dispute", type: "link" },
      { path: "history", title: "History", type: "link" },
    ],
  },
];