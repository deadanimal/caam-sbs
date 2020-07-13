import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutelistKucComponent } from './routelist-kuc.component';

describe('RoutelistKucComponent', () => {
  let component: RoutelistKucComponent;
  let fixture: ComponentFixture<RoutelistKucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutelistKucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutelistKucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
