import { TestBed } from '@angular/core/testing';

import { FpldatasHistoryService } from './data-history.service';

describe('FpldatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FpldatasHistoryService = TestBed.get(FpldatasHistoryService);
    expect(service).toBeTruthy();
  });
});
