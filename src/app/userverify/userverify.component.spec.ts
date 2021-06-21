import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserverifyComponent } from './userverify.component';

describe('UserverifyComponent', () => {
  let component: UserverifyComponent;
  let fixture: ComponentFixture<UserverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
