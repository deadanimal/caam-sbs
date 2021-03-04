import { PaymentListComponent } from './payment-list/payment-list.component';

import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { StatementAccountComponent } from './statement-account/statement-account.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';
import { OutstandingPaymentComponent } from './outstanding-list/outstanding-payment.component';
import { OnlinePaymentComponent } from './online-payment/online-payment/online-payment.component';

const routes: Routes = [
  {  },
];

export const PaymentRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "payment",
        component: PaymentComponent,
      },
      {
        path: "statement-account",
        component: StatementAccountComponent,
      },
      {
        path: "outstanding-payment",
        component: OutstandingPaymentComponent,
      },
      {
        path: "deposit-list",
        component: DepositListComponent,
      },
      {
        path: "payment-list",
        component: PaymentListComponent,
      },
      {
        path: "online",
        component: OnlinePaymentComponent,
      },


     
    ],
  },
]
