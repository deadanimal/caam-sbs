import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPaymentReportListComponent } from './advanced-payment-report-list.component';

describe('AdvancedPaymentReportListComponent', () => {
  let component: AdvancedPaymentReportListComponent;
  let fixture: ComponentFixture<AdvancedPaymentReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedPaymentReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedPaymentReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
