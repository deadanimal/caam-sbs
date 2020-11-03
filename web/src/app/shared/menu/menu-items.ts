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
    icontype: "fas fa-desktop text-blue",
  },
  {
    path: "/app/movement-report",
    title: "Movement Report",
    type: "link",
    icontype: "fas fa-file text-black",
  },
  {
    path: "/app/dispute",
    title: "Dispute",
    type: "link",
    icontype: "fas fa-thumbs-down text-red",
  },
  {
    path: "/app/billing",
    title: "Billing",
    icontype: "fas fa-file-invoice-dollar text-green",
    type: "sub",
    collapse: "billing",
    isCollapsed: true,
    children: [
      { path: "invoice", title: "Invoice", type: "link" },    
      { path: "credit-note", title: "Credit Note", type: "link" },           
      { path: "debit-note", title: "Debit Note", type: "link" },          
    ]
  },
  {
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-yellow",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "payment", title: "Payment", type: "link" },    
      { path: "statement-account", title: "Statement of Account", type: "link" },            
    ]
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
    icontype: "fas fa-database text-black",
    collapse: "database",
    isCollapsed: true,
    children: [
      { path: "aircraft", title: "Aircraft", type: "link", },      
      { path: "airline", title: "Airline", type: "link", },
      { path: "airport", title: "Airport", type: "link", },      
      { path: "callsign", title: "Callsign", type: "link", },   
      { path: "rate", title: "Rate", type: "link", },   
      { path: "route", title: "Route", type: "link", },            
    ],
  },
  {
    path: "/app/task",
    title: "Task",
    type: "sub",
    icontype: "fas fa-hdd text-blue",
    collapse: "task",
    isCollapsed: true,
    children: [
        { path: "data-upload", title: "Upload", type: "link" },
        { path: "data-history", title: "History", type: "link" },    
    ],
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
      { path: "aircraft", title: "Aircraft", type: "link" },      
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },      
      { path: "callsign", title: "Callsign", type: "link" },
      { path: "exemptions", title: "Exemptions", type: "link" },      
      { path: "rate", title: "Rate", type: "link" },   
      { path: "route", title: "Route", type: "link" },            
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
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-red",
    collapse: "database",
    isCollapsed: true,
    children: [
      { path: "aircraft", title: "Aircraft", type: "link" },      
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },      
      { path: "callsign", title: "Callsign", type: "link" },
      { path: "exemptions", title: "Exemptions", type: "link" },      
      { path: "rate", title: "Rate", type: "link" },   
      { path: "route", title: "Route", type: "link" },            
    ],
  },  
  // {
  //   path: "/app/finance",
  //   title: "Finance",
  //   icontype: "fas fa-file-invoice-dollar text-green",
  //   type: "sub",
  //   collapse: "finance",
  //   isCollapsed: true,
  //   children: [
  //     { path: "invoices", title: "Invoice", type: "link" },    
  //     { path: "notes", title: "Credit & Debit Note", type: "link" },           
  //     { path: "payments", title: "Payment", type: "link" },          
  //     { path: "others", title: "Other", type: "link" },  
  //   ]
  // },  

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
      { path: "aircraft", title: "Aircraft", type: "link" },      
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },      
      { path: "callsign", title: "Callsign", type: "link" },
      { path: "exemptions", title: "Exemptions", type: "link" },      
      { path: "rate", title: "Rate", type: "link" },   
      { path: "route", title: "Route", type: "link" },            
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
  {
    path: "/app/finance",
    title: "Finance",
    icontype: "fas fa-file-invoice-dollar text-green",
    type: "sub",
    collapse: "finance",
    isCollapsed: true,
    children: [
      { path: "invoices", title: "Invoice List", type: "link" },    
      { path: "aging-invoice", title: "Aging Invoice", type: "link" },           
      { path: "credit-debit-note", title: "Credit and Debit Note", type: "link" },          
      { path: "general-ledger", title: "General Ledger", type: "link" },  
      { path: "payment", title: "Payments", type: "link" },  
    ]
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
      { path: "aircraft", title: "Aircraft", type: "link" },      
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },      
      { path: "callsign", title: "Callsign", type: "link" },
      { path: "exemptions", title: "Exemptions", type: "link" },      
      { path: "rate", title: "Rate", type: "link" },   
      { path: "route", title: "Route", type: "link" },            
    ],
  },
  {
    path: "/app/finance",
    title: "Finance",
    icontype: "fas fa-file-invoice-dollar text-green",
    type: "sub",
    collapse: "finance",
    isCollapsed: true,
    children: [
      {path: "invoices", title: "Invoice List", type: "link" },    
      { path: "aging-invoice", title: "Aging Invoice", type: "link" },           
      { path: "credit-debit-note", title: "Credit and Debit Note", type: "link" },          
      { path: "general-ledger", title: "General Ledger", type: "link" },  
      // { path: "payment", title: "Payments", type: "link" },    
    ]
  },
];