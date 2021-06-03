/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovementReportComponent } from './movement-report.component';

describe('MovementReportComponent', () => {
  let component: MovementReportComponent;
  let fixture: ComponentFixture<MovementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
