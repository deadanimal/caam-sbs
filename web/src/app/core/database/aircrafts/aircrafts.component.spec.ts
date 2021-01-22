import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftTypeInformationComponent } from './aircraft-type-information.component';

describe('AircraftTypeInformationComponent', () => {
  let component: AircraftTypeInformationComponent;
  let fixture: ComponentFixture<AircraftTypeInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftTypeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftTypeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
