import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDebitNoteReportComponent } from './credit-debit-note-report.component';

describe('CreditDebitNoteReportComponent', () => {
  let component: CreditDebitNoteReportComponent;
  let fixture: ComponentFixture<CreditDebitNoteReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditDebitNoteReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditDebitNoteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
