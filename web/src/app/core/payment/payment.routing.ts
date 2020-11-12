import { OutstandingPaymentComponent } from './outstanding-payment/outstanding-payment.component';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { StatementAccountComponent } from './statement-account/statement-account.component';

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
     
    ],
  },
]
