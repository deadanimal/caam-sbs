import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutelistSemenanjungComponent } from './routelist-semenanjung.component';

describe('RoutelistSemenanjungComponent', () => {
  let component: RoutelistSemenanjungComponent;
  let fixture: ComponentFixture<RoutelistSemenanjungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutelistSemenanjungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutelistSemenanjungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
