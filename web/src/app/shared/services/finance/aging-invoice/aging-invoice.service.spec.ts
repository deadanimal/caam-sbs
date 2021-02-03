import { TestBed } from '@angular/core/testing';

import { AgingInvoicesService } from './aging-invoice.service';

describe('InvoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgingInvoicesService = TestBed.get(AgingInvoicesService);
    expect(service).toBeTruthy();
  });
});
