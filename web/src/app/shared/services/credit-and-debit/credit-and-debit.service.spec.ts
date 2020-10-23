import { TestBed } from '@angular/core/testing';

import { CreditDebitService } from './credit-and-debit.service';

describe('CreditDebitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreditDebitService = TestBed.get(CreditDebitService);
    expect(service).toBeTruthy();
  });
});
