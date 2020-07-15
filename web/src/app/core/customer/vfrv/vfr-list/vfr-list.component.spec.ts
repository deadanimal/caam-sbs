import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VfrListComponent } from './vfr-list.component';

describe('VfrListComponent', () => {
  let component: VfrListComponent;
  let fixture: ComponentFixture<VfrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VfrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VfrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
