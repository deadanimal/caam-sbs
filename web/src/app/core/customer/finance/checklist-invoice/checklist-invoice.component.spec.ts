import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistInvoiceComponent } from './checklist-invoice.component';

describe('ChecklistInvoiceComponent', () => {
  let component: ChecklistInvoiceComponent;
  let fixture: ComponentFixture<ChecklistInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
