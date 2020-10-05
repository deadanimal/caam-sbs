import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutelistKkComponent } from './routelist-kk.component';

describe('RoutelistKkComponent', () => {
  let component: RoutelistKkComponent;
  let fixture: ComponentFixture<RoutelistKkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutelistKkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutelistKkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
