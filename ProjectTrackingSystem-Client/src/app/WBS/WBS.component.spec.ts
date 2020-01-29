/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WBSComponent } from './WBS.component';

describe('WBSComponent', () => {
  let component: WBSComponent;
  let fixture: ComponentFixture<WBSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WBSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
