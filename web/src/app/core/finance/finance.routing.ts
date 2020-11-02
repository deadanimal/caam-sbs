import { Routes } from "@angular/router";


export const FinanceRoute: Routes = [
  {
    path: "",
    data: {
      breadcrumb: "Finance",
    },
    children: [

      // {
      //   path: "rate",
      //   component: RateListComponent,
      //   data: {
      //     breadcrumb: "Rate List",
      //   },
      // },

    ],
  },
];
