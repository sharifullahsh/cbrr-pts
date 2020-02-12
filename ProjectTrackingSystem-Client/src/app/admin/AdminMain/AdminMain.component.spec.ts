import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainComponent } from './AdminMain.component';

describe('AdminMainComponent', () => {
  let component: AdminMainComponent;
  let fixture: ComponentFixture<AdminMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
