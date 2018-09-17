import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialControllerComponent } from './financial-controller.component';

describe('FinancialControllerComponent', () => {
  let component: FinancialControllerComponent;
  let fixture: ComponentFixture<FinancialControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
