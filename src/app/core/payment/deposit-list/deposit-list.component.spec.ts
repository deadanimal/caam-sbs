/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepositListComponent } from './deposit-list.component';

describe('DepositListComponent', () => {
  let component: DepositListComponent;
  let fixture: ComponentFixture<DepositListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
