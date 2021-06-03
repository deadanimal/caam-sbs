import { TestBed } from '@angular/core/testing';

import { ApprovalsService } from './approvals.service';

describe('ApprovalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalsService = TestBed.get(ApprovalsService);
    expect(service).toBeTruthy();
  });
});
