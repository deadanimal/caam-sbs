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
    icontype: "fas fa-file text-blue",
  },
  {
    path: "/app/billing",
    title: "Billing",
    icontype: "fas fa-file-invoice-dollar text-blue",
    type: "sub",
    collapse: "billing",
    isCollapsed: true,
    children: [
      { path: "invoice", title: "Invoice", type: "link" },    
      { path: "credit-note", title: "Debit & Credit Note", type: "link" },           
      //{ path: "debit-note", title: "Debit Note", type: "link" },          
      { path: "dispute", title: "Dispute", type: "link" },          

    ]
  },
  {
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-blue",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      // { path: "online", title: "Pay Online", type: "link" },    
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
    icontype: "fas fa-desktop text-blue",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-blue",
    collapse: "database",
    isCollapsed: true,
    children: [
      { path: "aircraft", title: "Aircraft", type: "link" },
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },
      { path: "callsign", title: "Callsign", type: "link" },
      { path: "rate", title: "Rate", type: "link" },
      { path: "route", title: "Route", type: "link" },
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
        // { path: "dispute", title: "Dispute", type: "link" },
        // { path: "tfl-vfr", title: "TFL/VFR", type: "link" },  
        { path: "dispute", title: "Dispute", type: "link" },
        // { path: "credit-debit-note", title: "Credit and Debit Note", type: "link" },          
        { path: "upload", title: "TFL/VFR", type: "link" },  
        // { path: "data", title: "History", type: "link" },   
    ],
  },
  {
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-blue",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "deposit-list", title: "Deposit List", type: "link" }, 
      { path: "outstanding-payment", title: "Outstanding List", type: "link" },                
    ]
  },  
];

export const OperationRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-blue",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-blue",
    collapse: "database",
    isCollapsed: true,
    children: [
      { path: "aircraft", title: "Aircraft", type: "link" },
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },
      { path: "callsign", title: "Callsign", type: "link" },
      //{ path: "exemptions", title: "Exemptions", type: "link" },
      { path: "rate", title: "Rate", type: "link" },
      { path: "route", title: "Route", type: "link" },
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
      // { path: "tflvfr", title: "TFL/VFR", type: "link" },
      // { path: "dispute", title: "Dispute", type: "link" },
      { path: "task", title: "Approve", type: "link" }, 
      { path: "upload", title: "TFL/VFR", type: "link" },  
      { path: "dispute", title: "Dispute", type: "link" },
      // { path: "credit-debit-note", title: "Credit and Debit Note", type: "link" },          


    ],
  },
  {
    path: "/app/master-data",
    title: "Master Data",
    type: "link",
    icontype: "fas fa-server text-blue",
  },
  {
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-blue",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "outstanding-payment", title: "Outstanding List", type: "link" },               
    ]
  }, 
];

export const SafRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-blue",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-blue",
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
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-blue",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "deposit-list", title: "Deposit List", type: "link" }, 
      { path: "outstanding-payment", title: "Outstanding List", type: "link" },
                      
    ]
  },   

];

export const HodRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-blue",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-blue",
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
    icontype: "fas fa-hdd text-blue",
    collapse: "task",
    isCollapsed: true,
    children: [
      { path: "generate-invoice", title: "Generate Invoice", type: "link" },
      { path: "users", title: "User Management", type: "link" }, // add new path for user management component
      { path: "dispute", title: "Dispute", type: "link" },
      // { path: "invoice-view", title: "Invoice View", type: "link" },
      // { path: "history", title: "History", type: "link" },
    ],
  },
  {
    path: "/app/master-data",
    title: "Master Data",
    type: "link",
    icontype: "fas fa-server text-blue",
  },
  {
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-blue",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "deposit-list", title: "Deposit List", type: "link" },   
      { path: "outstanding-payment", title: "Outstanding List", type: "link" },
                    
    ]
  }, 
  {
    path: "/app/finance",
    title: "Finance",
    icontype: "fas fa-file-invoice-dollar text-blue",
    type: "sub",
    collapse: "finance",
    isCollapsed: true,
    children: [
      { path: "invoices", title: "Invoice List", type: "link" },    
      { path: "aging-invoice", title: "Aging Invoice", type: "link" },           
      { path: "credit-debit-note", title: "Credit and Debit Note", type: "link" },          
      { path: "general-ledger", title: "General Ledger", type: "link" },  
    ]
  },  
];

export const FinanceRoutes: RouteInfo[] = [
  {
    path: "/app/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-desktop text-blue",
  },
  {
    path: "/app/database",
    title: "Database",
    type: "sub",
    icontype: "fas fa-database text-blue",
    collapse: "database",
    isCollapsed: true,
    children: [
      { path: "aircraft", title: "Aircraft", type: "link" },
      { path: "airline", title: "Airline", type: "link" },
      { path: "airport", title: "Airport", type: "link" },
      { path: "callsign", title: "Callsign", type: "link" },
      //{ path: "exemptions", title: "Exemptions", type: "link" },
      { path: "rate", title: "Rate", type: "link" },
      { path: "route", title: "Route", type: "link" },
    ],
  },
  {
    path: "/app/payment",
    title: "Payment",
    icontype: "fas fa-credit-card text-blue",
    type: "sub",
    collapse: "payment",
    isCollapsed: true,
    children: [
      { path: "payment-list", title: "Payment List", type: "link" },  
      { path: "deposit-list", title: "Deposit List", type: "link" },  
      { path: "outstanding-payment", title: "Outstanding List", type: "link" },                
    ]
  }, 
  {
    path: "/app/finance",
    title: "Finance",
    icontype: "fas fa-file-invoice-dollar text-blue",
    type: "sub",
    collapse: "finance",
    isCollapsed: true,
    children: [
      {path: "invoices", title: "Invoice List", type: "link" },    
      { path: "aging-invoice", title: "Aging Invoice", type: "link" },           
      { path: "credit-debit-note", title: "Credit and Debit Note", type: "link" },          
      { path: "general-ledger", title: "General Ledger", type: "link" },   
    ]
  },
];
