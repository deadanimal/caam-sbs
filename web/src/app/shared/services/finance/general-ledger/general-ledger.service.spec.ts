import { TestBed } from '@angular/core/testing';

import { GeneralLedgerService } from './general-ledger.service';

describe('CreditDebitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralLedgerService = TestBed.get(GeneralLedgerService);
    expect(service).toBeTruthy();
  });
});
