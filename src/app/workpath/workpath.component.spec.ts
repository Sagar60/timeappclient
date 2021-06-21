import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpathComponent } from './workpath.component';

describe('WorkpathComponent', () => {
  let component: WorkpathComponent;
  let fixture: ComponentFixture<WorkpathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
