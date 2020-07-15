import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingPaymentSurchargeComponent } from './outstanding-payment-surcharge.component';

describe('OutstandingPaymentSurchargeComponent', () => {
  let component: OutstandingPaymentSurchargeComponent;
  let fixture: ComponentFixture<OutstandingPaymentSurchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingPaymentSurchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingPaymentSurchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
