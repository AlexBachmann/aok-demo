/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputDebounceComponent } from './input-debounce.component';

describe('InputDebounceComponent', () => {
  let component: InputDebounceComponent;
  let fixture: ComponentFixture<InputDebounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDebounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDebounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
