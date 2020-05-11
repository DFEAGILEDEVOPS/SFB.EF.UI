/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaysToImproveComponent } from './ways-to-improve.component';

describe('WaysToImproveComponent', () => {
  let component: WaysToImproveComponent;
  let fixture: ComponentFixture<WaysToImproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaysToImproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaysToImproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
