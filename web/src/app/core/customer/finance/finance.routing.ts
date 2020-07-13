import { Routes } from '@angular/router';
import { RegisterInvoiceComponent } from './register-invoice/register-invoice.component';
import { AgingInvoiceComponent } from './aging-invoice/aging-invoice.component';
import { ChecklistInvoiceComponent } from './checklist-invoice/checklist-invoice.component';
import { ChargesComponent } from './charges/charges.component';
import { ExemptionsComponent } from './exemptions/exemptions.component';

export const FinanceRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'invoice',
                component: RegisterInvoiceComponent
            },
            {
                path: 'aging-invoice',
                component: AgingInvoiceComponent
            },
            {
                path: 'checklist-invoice',
                component: ChecklistInvoiceComponent
            },
            {
                path: 'exemptions',
                component: ExemptionsComponent
            },
            {
                path: 'charges',
                component: ChargesComponent
            }
        ]
    }
]