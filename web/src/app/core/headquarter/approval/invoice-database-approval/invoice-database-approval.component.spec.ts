import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDatabaseApprovalComponent } from './invoice-database-approval.component';

describe('InvoiceDatabaseApprovalComponent', () => {
  let component: InvoiceDatabaseApprovalComponent;
  let fixture: ComponentFixture<InvoiceDatabaseApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDatabaseApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDatabaseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
