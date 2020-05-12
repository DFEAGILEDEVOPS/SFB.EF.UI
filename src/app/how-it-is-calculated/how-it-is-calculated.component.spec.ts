/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HowItIsCalculatedComponent } from './how-it-is-calculated.component';

describe('HowItIsCalculatedComponent', () => {
  let component: HowItIsCalculatedComponent;
  let fixture: ComponentFixture<HowItIsCalculatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowItIsCalculatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItIsCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
