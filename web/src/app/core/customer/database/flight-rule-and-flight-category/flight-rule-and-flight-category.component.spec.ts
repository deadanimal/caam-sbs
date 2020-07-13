import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRuleAndFlightCategoryComponent } from './flight-rule-and-flight-category.component';

describe('FlightRuleAndFlightCategoryComponent', () => {
  let component: FlightRuleAndFlightCategoryComponent;
  let fixture: ComponentFixture<FlightRuleAndFlightCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightRuleAndFlightCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightRuleAndFlightCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
