import { TestBed } from '@angular/core/testing';

import { PaymentListNewPaymentService } from './payment-list-new-payment.service';

describe('PaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentListNewPaymentService = TestBed.get(PaymentListNewPaymentService);
    expect(service).toBeTruthy();
  });
});
