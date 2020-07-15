import { Routes } from '@angular/router';
import { ChecklistComponent } from './checklist/checklist.component';
import { ReportListComponent } from './report-list/report-list.component';
import { AdvancedPaymentReportListComponent } from './advanced-payment-report-list/advanced-payment-report-list.component';
import { OutstandingPaymentComponent } from './outstanding-payment/outstanding-payment.component';

export const PaymentRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'checklist',
                component: ChecklistComponent
            },
            {
                path: 'payment-list',
                component: ReportListComponent
            },
            {
                path: 'deposit-report-list',
                component: AdvancedPaymentReportListComponent
            },
            {
                path: 'outstanding-payment',
                component: OutstandingPaymentComponent
            },
        ]
    }
]