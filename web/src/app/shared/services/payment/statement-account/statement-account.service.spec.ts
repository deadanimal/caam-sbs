import { TestBed } from '@angular/core/testing';

import { StatementAccountService } from './statement-account.service';

describe('PaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatementAccountService = TestBed.get(StatementAccountService);
    expect(service).toBeTruthy();
  });
});
