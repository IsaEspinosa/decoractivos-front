import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEnvironmentCardComponent } from './landing-environment-card.component';

describe('LandingEnvironmentCardComponent', () => {
  let component: LandingEnvironmentCardComponent;
  let fixture: ComponentFixture<LandingEnvironmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingEnvironmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingEnvironmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
