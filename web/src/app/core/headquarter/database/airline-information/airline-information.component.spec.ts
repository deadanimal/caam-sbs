import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineInformationComponent } from './airline-information.component';

describe('AirlineInformationComponent', () => {
  let component: AirlineInformationComponent;
  let fixture: ComponentFixture<AirlineInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
