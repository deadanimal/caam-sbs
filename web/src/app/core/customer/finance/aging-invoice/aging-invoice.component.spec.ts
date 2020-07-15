import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingInvoiceComponent } from './aging-invoice.component';

describe('AgingInvoiceComponent', () => {
  let component: AgingInvoiceComponent;
  let fixture: ComponentFixture<AgingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
