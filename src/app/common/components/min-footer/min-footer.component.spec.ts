import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinFooterComponent } from './min-footer.component';

describe('MinFooterComponent', () => {
  let component: MinFooterComponent;
  let fixture: ComponentFixture<MinFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
