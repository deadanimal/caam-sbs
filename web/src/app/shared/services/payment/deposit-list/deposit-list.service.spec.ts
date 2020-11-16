import { TestBed } from '@angular/core/testing';

import { DepositListService } from './deposit-list.service';

describe('PaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepositListService = TestBed.get(DepositListService);
    expect(service).toBeTruthy();
  });
});
