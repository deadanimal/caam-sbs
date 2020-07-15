import { Routes } from '@angular/router';
import { ChecklistComponent } from './checklist/checklist.component';
import { ReportListComponent } from './report-list/report-list.component';
import { AdvancedPaymentReportListComponent } from './advanced-payment-report-list/advanced-payment-report-list.component';
import { PaymentSummaryReportComponent } from './payment-summary-report/payment-summary-report.component';
import { OutstandingPaymentComponent } from './outstanding-payment/outstanding-payment.component';
import { OutstandingPaymentSurchargeComponent } from './outstanding-payment-surcharge/outstanding-payment-surcharge.component';

export const PaymentRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'checklist',
                component: ChecklistComponent
            },
            {
                path: 'report-list',
                component: ReportListComponent
            },
            {
                path: 'advanced-payment-report-list',
                component: AdvancedPaymentReportListComponent
            },
            {
                path: 'payment-summary-report',
                component: PaymentSummaryReportComponent
            },
            {
                path: 'outstanding-payment',
                component: OutstandingPaymentComponent
            },
            {
                path: 'outstanding-payment-surcharge',
                component: OutstandingPaymentSurchargeComponent
            }
        ]
    }
]