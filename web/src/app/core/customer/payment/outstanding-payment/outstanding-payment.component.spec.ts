import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingPaymentComponent } from './outstanding-payment.component';

describe('OutstandingPaymentComponent', () => {
  let component: OutstandingPaymentComponent;
  let fixture: ComponentFixture<OutstandingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
