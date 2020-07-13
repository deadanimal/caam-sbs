import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyInvoiceApprovalComponent } from './monthly-invoice-approval.component';

describe('MonthlyInvoiceApprovalComponent', () => {
  let component: MonthlyInvoiceApprovalComponent;
  let fixture: ComponentFixture<MonthlyInvoiceApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyInvoiceApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyInvoiceApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
