import { TestBed } from '@angular/core/testing';

import { MovementReportService } from './movement-report.service';

describe('InvoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovementReportService = TestBed.get(MovementReportService);
    expect(service).toBeTruthy();
  });
});
