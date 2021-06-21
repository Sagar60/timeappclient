import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Changepassword2Component } from './changepassword2.component';

describe('Changepassword2Component', () => {
  let component: Changepassword2Component;
  let fixture: ComponentFixture<Changepassword2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Changepassword2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Changepassword2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
