import { TestBed } from '@angular/core/testing';

import { TflVfrService } from './tfl-vfr.service';

describe('PaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TflVfrService = TestBed.get(TflVfrService);
    expect(service).toBeTruthy();
  });
});


