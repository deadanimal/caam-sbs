import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FplDataFpexclusionMultipleCallsignComponent } from './fpl-data-fpexclusion-multiple-callsign.component';

describe('FplDataFpexclusionMultipleCallsignComponent', () => {
  let component: FplDataFpexclusionMultipleCallsignComponent;
  let fixture: ComponentFixture<FplDataFpexclusionMultipleCallsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FplDataFpexclusionMultipleCallsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FplDataFpexclusionMultipleCallsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
