import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerMakerComponent } from './checker-maker.component';

describe('CheckerMakerComponent', () => {
  let component: CheckerMakerComponent;
  let fixture: ComponentFixture<CheckerMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
