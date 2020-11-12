import { TestBed } from '@angular/core/testing';

import { CreditNoteService } from './credit-note.service';

describe('InvoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreditNoteService = TestBed.get(CreditNoteService);
    expect(service).toBeTruthy();
  });
});
