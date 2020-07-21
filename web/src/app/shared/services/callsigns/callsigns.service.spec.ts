import { TestBed } from '@angular/core/testing';

import { CallsignsService } from './callsigns.service';

describe('CallsignsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallsignsService = TestBed.get(CallsignsService);
    expect(service).toBeTruthy();
  });
});
