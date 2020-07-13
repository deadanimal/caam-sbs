import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAccountReportComponent } from './statement-account-report.component';

describe('StatementAccountReportComponent', () => {
  let component: StatementAccountReportComponent;
  let fixture: ComponentFixture<StatementAccountReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementAccountReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementAccountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
