import { TestBed } from '@angular/core/testing';

import { FpldatasService } from './fpldatas.service';

describe('FpldatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FpldatasService = TestBed.get(FpldatasService);
    expect(service).toBeTruthy();
  });
});
