import { TestBed } from '@angular/core/testing';

import { OutstandingPaymentService } from './outstanding-payment.service';

describe('PaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutstandingPaymentService = TestBed.get(OutstandingPaymentService);
    expect(service).toBeTruthy();
  });
});
