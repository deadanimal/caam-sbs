import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineManagementReportComponent } from './airline-management-report.component';

describe('AirlineManagementReportComponent', () => {
  let component: AirlineManagementReportComponent;
  let fixture: ComponentFixture<AirlineManagementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineManagementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
