import { TestBed } from '@angular/core/testing';

import { AircraftsService } from './aircrafts.service';

describe('AircraftsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AircraftsService = TestBed.get(AircraftsService);
    expect(service).toBeTruthy();
  });
});
