import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseControllerComponent } from './expense-controller.component';

describe('ExpenseControllerComponent', () => {
  let component: ExpenseControllerComponent;
  let fixture: ComponentFixture<ExpenseControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
