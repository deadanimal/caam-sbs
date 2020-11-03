import { TestBed } from '@angular/core/testing';

import { DebitNoteService } from './debit-note.service';

describe('InvoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebitNoteService = TestBed.get(DebitNoteService);
    expect(service).toBeTruthy();
  });
});
