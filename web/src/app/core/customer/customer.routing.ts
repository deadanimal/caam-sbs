import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { OperationReportComponent } from './reporting/operation-report/operation-report.component';
import { FinanceReportComponent } from './reporting/finance-report/finance-report.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { VfrComponent } from './vfr/vfr.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StatementAccountReportComponent } from './statement-account-report/statement-account-report.component';
import { CreditDebitNoteReportComponent } from './credit-debit-note-report/credit-debit-note-report.component';

export const CustomerRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'database',
                loadChildren: () => import('./database/database.module').then(m => m.CustomerDatabaseModule)
            },
            {
                path: 'management',
                component: ManagementComponent
            },
            {
                path: 'report',
                children: [
                    {
                        path: 'operation',
                        component: OperationReportComponent
                    },
                    {
                        path: 'finance',
                        component: FinanceReportComponent
                    }
                ] 
            },
            {
                path: 'analysis',
                component: AnalysisComponent
            },
            {
                path: 'vfrv',
                // component: VfrComponent
                loadChildren: () => import('./vfrv/vfrv.module').then(m => m.CustomerVfrvModule)
            },
            {
                path: 'invoice',
                component: InvoiceComponent
            },
            {
                path: 'finance',
                loadChildren: () => import('./finance/finance.module').then(m => m.CustomerFinanceModule)
            },
            {
                path: 'utility',
                loadChildren: () => import('./utility/utility.module').then(m => m.CustomerUtilityModule)
            },
            {
                path: 'payment',
                loadChildren: () => import('./payment/payment.module').then(m => m.CustomerPaymentModule)
            },
            {
                path: 'statement-account-report',
                component: StatementAccountReportComponent
            },
            {
                path: 'credit-debit-note-report',
                component: CreditDebitNoteReportComponent
            }
        ]
    }
]